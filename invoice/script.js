// when print button will be clicked then pdf preview will be open and additional divs will be hidden
$(".print").click(function(){
    $(".print").hide();
    $(".item_add").hide();
    $(".item_remove").hide();
    window.print();
});

// general row consists of product, quantity, unit price, total, '+', '-' 
// we are gonna copy this row and paste when + button is clicked
$new_tr = "<tr class=\"duplicate_me\"><td><input  placeholder=\"product name\"></td><td><input style=\"max-width: 200px;\" placeholder=\"product qty\" class=\"product_qty\" max=\"10\"></td><td>X</td><td><input style=\"max-width: 200px;\" placeholder=\"unit price\" class=\"unit_price\"></td><td><input style=\"max-width: 200px;\" placeholder=\"total\" class=\"sub_total\" align=\"right\"></td><td><button class=\"btn btn-primary item_add\">+</button></td><td><button class=\"btn btn-primary item_remove\">-</button></td></tr>"


// when '+' button '/' item_add button clicked then it'll copy the next_tr
// and paste it to the next line
$("body").on("click", ".item_add", function(){
    $(".product_table tbody").append($new_tr);
});

// when '-' button is clicked then get the tr and remove this one
$("body").on("click", ".item_remove", function(){
    $get_row = $(this).closest("tr");
    $get_row.remove();
});

// when product price & unit is changed, then effects on total_price
// problem is calculating this SUM of the first row, but now the rest of the table
$("body").on("keyup", ".product_qty, .unit_price", function(){
    // working row i'm pointing
    let $row = jQuery(this).closest('tr');
    // get product_qty and unit_price from this row
    let product_qty = $row.find(".product_qty").val();
    let unit_price = $row.find(".unit_price").val();
    // calculate subtotal of the same row product_qty and unit_price
    $row.find(".sub_total").val(product_qty*unit_price);
});

