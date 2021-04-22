// Put your application javascript here

function changeOrderMemo() {
    if ($("#order-memo-check").prop("checked")) {
        $("#order-memo").show();
    } else {
        $("#order-memo").hide();
    }
}

$(function (){
    $('.modal-btn').trigger("click");

    let sample = "aa";
    console.log("sample");

    $('#AddToCartForm').submit(function(event) {
        // HTMLでの送信をキャンセル
        event.preventDefault();

        // 操作対象のフォーム要素を取得
        let form = $(this);

        // 送信ボタンを取得
        let button = form.find('button');
        console.log("sasasa");
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: form.serialize(),
            timeout: 10000,  // 単位はミリ秒

            // 送信前
            beforeSend: function(xhr, settings) {
                // ボタンを無効化し、二重送信を防止
                button.attr('disabled', true);
            },
            // 応答後
            complete: function(xhr, textStatus) {
                // ボタンを有効化し、再送信を許可
                button.attr('disabled', false);
            },

            // 通信成功時の処理
            success: function(result, textStatus, xhr) {
                // 入力値を初期化
                form[0].reset();

                alert('カートに追加されました');
            },

            // 通信失敗時の処理
            error: function(xhr, textStatus, error) {
                alert('処理に失敗しました...');
            }
        });
    });



    function addItemToCart(variant_id, qty, frequency, unit_type) {
        data = {
            "id": variant_id,
            "quantity": qty
        }

        jQuery.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: data,
            dataType: 'json',
            success: function() {
                document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
                    bubbles: true  //this code is for prestige theme, is to refresh the cart
                }));
            }
        });
        document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
            bubbles: true    // same code for prestige theme
        }));
    }
});

