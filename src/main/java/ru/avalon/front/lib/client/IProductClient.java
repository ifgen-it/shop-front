package ru.avalon.front.lib.client;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.avalon.front.lib.dto.ProductDto;

import java.util.List;

public interface IProductClient {

    @GetMapping("/api/v1/product/{productId}")
    ResponseEntity<ProductDto> getById(@PathVariable Long productId);

    @GetMapping("/api/v1/products")
    List<ProductDto> getAll();

    @PostMapping("/api/v1/product")
    ResponseEntity<ProductDto> create(@RequestBody ProductDto productDto);

}
