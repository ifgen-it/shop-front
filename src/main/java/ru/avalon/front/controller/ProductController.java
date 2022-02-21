package ru.avalon.front.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.bouncycastle.util.encoders.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import ru.avalon.front.feign.CategoryClient;
import ru.avalon.front.feign.ProductClient;
import ru.avalon.front.lib.dto.CategoryDto;
import ru.avalon.front.lib.dto.ProductDto;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController {

    ProductClient productClient;
    CategoryClient categoryClient;

    @GetMapping("/")
    public String home() {
        return "redirect:/products";
    }

    @GetMapping("/products")
    public String getProducts(Model model) {
        List<ProductDto> products = productClient.getAll();
        model.addAttribute("products", products);
        return "products";
    }

    @GetMapping("/product/{productId}")
    public String getProduct(@PathVariable("productId") Integer productId, Model model) {
        ResponseEntity<ProductDto> responseProduct = productClient.getById(productId.longValue());
        if (responseProduct.getStatusCode().equals(HttpStatus.OK)) {
            model.addAttribute("product", responseProduct.getBody());
            return "product";
        }
        else // todo сделать страницу с ошибкой
            return "redirect:/products";
    }

    @GetMapping("/product-edit")
    public String createProduct(Model model) {
        List<CategoryDto> categories = categoryClient.getAll();
        model.addAttribute("categories", categories);
        return "product-edit";
    }

    @GetMapping("/product-edit/{productId}")
    public String editProduct(@PathVariable("productId") Integer productId, Model model) {
        ResponseEntity<ProductDto> responseProduct = productClient.getById(productId.longValue());
        List<CategoryDto> categories = categoryClient.getAll();
        if (responseProduct.getStatusCode().equals(HttpStatus.OK)) {
            model.addAttribute("product", responseProduct.getBody());
            model.addAttribute("categories", categories);
            return "product-edit";
        }
        else // todo сделать страницу с ошибкой
            return "redirect:/products";
    }

    @GetMapping("/upload")
    public String getUpload() {
        return "upload";
    }

    @PostMapping("/upload-file")
    public String upload(@RequestParam String name,
                         @RequestParam MultipartFile imageFile, Model model){
        System.out.println("begin upload");

        if (!imageFile.isEmpty()) {
            try {
                byte[] bytes = imageFile.getBytes();

                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(imageFile + "-uploaded"));
                stream.write(bytes);
                stream.close();
                model.addAttribute("result", "Вы удачно загрузили файл " + name);

                byte[] encodedBase64 = Base64.encode(bytes);
                String base64Encoded = new String(encodedBase64, StandardCharsets.UTF_8);
                model.addAttribute("imageBase64", base64Encoded);
            } catch (Exception e) {
                model.addAttribute("result", "Вам не удалось загрузить " + e.getMessage());
            }
        } else {
            model.addAttribute("result", "Вам не удалось загрузить потому что файл пустой");
        }

        return "upload";
    }
}
