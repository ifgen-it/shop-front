$(document).ready(
    function () {
        // загрузка списка продуктов
        /*$.ajax({
            method: "GET",
            url: "http://localhost:2222/products",
            dataType: "json",
            success: [
                function (msg) {
                    console.log("in function - Products were loaded");
                    insertIntoTable(msg);
                }
            ],
            statusCode: {
                200: function () {
                    console.log("Products were loaded");
                }
            }
        })*/

        // создание продукта
        $("#createProduct").click(
            function () {
                $("#errProductName").text("");
                $("#errProductPrice").text("");
                $("#errProductWeight").text("");
                $("#errProductDescription").text("");
                $("#errProductImage").text("");

                let productName = $("#productName").val();
                let productPrice = $("#productPrice").val();
                let productWeight = $("#productWeight").val();
                let productDescription = $("#productDescription").val();
                let productCategoryId = $("#productCategory").val();
                let isNeedImage = $("#isNeedImage").prop('checked');
                let productImage = null;
                if (isNeedImage == true) {
                    productImage = document.getElementById('productImage').files[0];
                }


                if (productName == "") {
                    $("#errProductName").text("Input Name");
                }
                if (productPrice == "") {
                    $("#errProductPrice").text("Input Price");
                }
                if (productWeight == "") {
                    $("#errProductWeight").text("Input Weight");
                }
                if (productDescription == "") {
                    $("#errProductDescription").text("Input Description");
                }
                if (isNeedImage == true && productImage == null) {
                    $("#errProductImage").text("Choose image");
                }

                if (productName != "" && productPrice != "" && productWeight != "" && productDescription != ""
                    && (isNeedImage == true && productImage != null || isNeedImage == false)) {

                    let product = new Blob([JSON.stringify({
                        name: productName,
                        price: productPrice,
                        category: {id: productCategoryId},
                        weight: productWeight,
                        description: productDescription
                    })], {type: "application/json"});

                    let formData = new FormData();
                    formData.append("productDto", product);
                    formData.append("image", productImage);

                    // POST
                    $.ajax({
                        method: "POST",
                        enctype: "multipart/form-data",
                        url: "http://localhost:2222/api/v1/product",
                        data: formData,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: [
                            function (msg) {
                                $("#productEditResult").text("Product was created with id=" + msg.id);
                            }
                        ],
                        statusCode: {
                            200: function () {
                                console.log("Ok");
                            }
                        }
                    })
                }
            }
        );

        // редактирование продукта
        $("#updateProduct").click(
            function () {
                $("#errProductName").text("");
                $("#errProductPrice").text("");
                $("#errProductWeight").text("");
                $("#errProductDescription").text("");
                $("#errProductImage").text("");

                let productId = $("#productId").val();
                let productName = $("#productName").val();
                let productPrice = $("#productPrice").val();
                let productWeight = $("#productWeight").val();
                let productDescription = $("#productDescription").val();
                let productCategoryId = $("#productCategory").val();
                let isNeedImage = $("#isNeedImage").prop('checked');
                let productImage = null;
                if (isNeedImage == true) {
                    productImage = document.getElementById('productImage').files[0];
                }

                if (productName == "") {
                    $("#errProductName").text("Input Name");
                }
                if (productPrice == "") {
                    $("#errProductPrice").text("Input Price");
                }
                if (productWeight == "") {
                    $("#errProductWeight").text("Input Weight");
                }
                if (productDescription == "") {
                    $("#errProductDescription").text("Input Description");
                }
                if (isNeedImage == true && productImage == null) {
                    $("#errProductImage").text("Choose image");
                }

                if (productName != "" && productPrice != "" && productWeight != "" && productDescription != ""
                    && (isNeedImage == true && productImage != null || isNeedImage == false)) {

                    let product = new Blob([JSON.stringify({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        category: {id: productCategoryId},
                        weight: productWeight,
                        description: productDescription
                    })], {type: "application/json"});

                    let formData = new FormData();
                    formData.append("productDto", product);
                    formData.append("image", productImage);

                    // PUT
                    $.ajax({
                        method: "PUT",
                        enctype: "multipart/form-data",
                        url: "http://localhost:2222/api/v1/product",
                        data: formData,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: [
                            function (msg) {
                                $("#productEditResult").text("Product with id = " + msg.id + " was updated");
                            }
                        ],
                        statusCode: {
                            200: function () {
                                console.log("Ok");
                            }
                        }
                    })
                }
            }
        );

    // конец
    }
);

// утилиты
/*
function insertIntoTable(msg) {
    let arr = msg;
    $.each(arr, function (index, value) {
        let row = $("<tr>" +
            "<td>" + value.name + "</td>" +
            "<td>" + value.price + "</td>" +
            "<td>" + value.category.name + "</td>" +
            "<td>" + value.weight + "</td>" +
            "<td>" + value.description + "</td>" +
            "<td>" + value.image + "</td>" +
            "<td>" + "<a href=\"product-edit/" + value.id + "\">Edit</a>" + "</td>" +
            "</tr>");
        $("#table_products").append(row);
    });
}*/
