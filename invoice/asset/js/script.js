// when this page will load preview_image will be hidden
$("document").ready(function() {
    $("#preview_image").hide();
});

// initially total value would be 0
let total = 0;
$(".total").val(total);
let total_subtotal = 0;
$(".total-sub-total").val(total_subtotal);
// initially total vat would be 0
let vat = 0;
$(".vat").val(vat);
// initially total discount would be 0
let discount = 0;
$(".discount").val(discount);



// when print button will be clicked then pdf preview will be open and additional divs will be hidden
$(".print").click(function(){
    $(".print").hide();
    $(".item_add").hide();
    $(".item_remove").hide();
    $(".logo-upload-field").remove();
    $("#edit_image").remove();
    $("#delete_image").remove();
    $("#label-one").remove();
    $("#label-two").remove();
    $("#label-three").remove();
    $(".company-name").hide();
    $(".company-address").hide();
    $(".phone-number").hide();
    $(".calculation").css("margin-right", "50px");
    window.print();
});

// general row consists of product, quantity, unit price, total, '+', '-' 
// we are gonna copy this row and paste when + button is clicked
$new_tr = "<tr class=\"duplicate_me\"><td><input  placeholder=\"product name\" class=\"product_name\"></td><td><input style=\"max-width: 200px;\" placeholder=\"product qty\" class=\"product_qty\" max=\"10\"></td><td>X</td><td><input style=\"max-width: 200px;\" placeholder=\"unit price\" class=\"unit_price\"></td><td><input style=\"max-width: 200px;\" placeholder=\"total\" class=\"sub_total\" align=\"right\"></td><td><button class=\"btn btn-primary item_add\">+</button></td><td><button class=\"btn btn-primary item_remove\">-</button></td></tr>"


// when '+' button '/' item_add button clicked then it'll copy the next_tr
// and paste it to the next line
$("body").on("click", ".item_add", function(){
    $(".product_table tbody").append($new_tr);
});

// when '-' button is clicked then get the tr and remove this one
$("body").on("click", ".item_remove", function(){
    $get_row = $(this).closest("tr");
    // get row's sub total
    let sub_total = $get_row.find(".sub_total").val();
    // get total field value
    let total = $(".total").val();
    // get sub total field's value
    let total_subtotal = $(".total-sub-total").val();
    // if row removes then deduct from total and sub-total
    // checking total and sub-total is greater than zero or not if zero then will not deduct, otherwise minus value will
    if(total > 0 && sub_total > 0){
        $(".total").val(parseFloat(total)-parseFloat(sub_total));
    }
    if(total_subtotal > 0 && sub_total > 0){
        $(".total-sub-total").val(parseFloat(total_subtotal)-parseFloat(sub_total));
    }
    let table_total_row = $(".product_table tr").length;
    // if table's total row is 2 then set null to all row value
    if(parseInt(table_total_row) == 2){
        $get_row.find(".product_name, .product_qty, .unit_price, .sub_total").val("");
    }
    // if total row (including the first tr) is greater than 2 the proceed to remove that row
    if(parseInt(table_total_row) > 2){
        // remove row
        $get_row.remove();
    }
});


// when any changes at product_table it'll collect product_qty and unit_price
// after calculating the sum of sub_total, total sum will be shown at total field
$(function() {
    $(".product_table").keyup(function(event) {
        var total = 0;
        $(".product_table .duplicate_me").each(function() {
            var product_qty = parseInt($(this).find(".product_qty").val());
            var unit_price = parseInt($(this).find(".unit_price").val());
            var subtotal = product_qty * unit_price;
            if(!product_qty || !unit_price){
                $(this).find(".sub_total").val(0);    
            }
            else{
                $(this).find(".sub_total").val(subtotal);
            }
            if(!isNaN(subtotal)){
                total+=subtotal;
            }
        });
        $(".total-sub-total").val(total);
        // adding also in the total field
        $(".total").val(total);
    });
});


// image scripting code
// when you upload company logo, then this lines of code auto sets in a box for preview
jQuery(document).ready(function($) {
    $('#delete_image').hide();
    $('#edit_image').hide();
    $('[name="image"]').hide();
   function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#preview_image').show();
            $('#preview_image').attr('src', e.target.result);
            $('#add_image').hide();
            $('#edit_image').show();
            $('#delete_image').show();
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    $('[name="image"]').change(function() {
      readURL(this);
    });

    $('#add_image,#edit_image').click(function(event) {
        $('[name="image"]').trigger('click');
    });

    $('#delete_image').click(function(event) {
        $('[name="image"]').val('');
        $('#preview_image').attr('src','');
        $('#preview_image').hide();
        $('#delete_image').hide();
        $('#edit_image').hide();
        $('#add_image').show();
    });
});


// when vat and discount changed then total changed
$("body").on("keyup", ".vat, .discount", function(){
    let total_sub_total = $(".total-sub-total").val();
    let vat = $(".vat").val();
    let discount = $(".discount").val();

    if(vat.length > 0){
        total_sub_total = parseFloat(total_sub_total) + parseFloat(total_sub_total) * (parseFloat(vat)/100);
        $(".total").val(total_sub_total);
    }
    if(discount.length > 0){
        total_sub_total = parseFloat(total_sub_total) - parseFloat(discount);
        $(".total").val(total_sub_total);
    }
    
});