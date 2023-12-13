(function () {
  const addProductToCart = async (artWorkData, token) => {
    var varaiantId = $('#js_design_tool_div').data('varaiant-id');
    var quantity = $('input[name="quantity"]').val();

    let formData = {
      items: [
        {
          id: varaiantId,
          quantity: quantity,
          properties: {
            _canvasEpsUrl: artWorkData.canvasEpsUrl,
            _canvasPdfUrl: artWorkData.canvasPdfUrl,
            _color: artWorkData.color,
            _imageSvg: artWorkData.imageUrl[0],
            _imageFull: artWorkData.imageUrl[1],
            _imprintLocation: artWorkData.variant,
            _token: token,
          },
        },
      ],
    };
    await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log('Added to the cart');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  async function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    console.log(window.Shopify.shop);
    script.onload = function () {
      callback();
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  async function getStoreToken() {
    const token = await fetch(
      'https://aakroline-personalization.fly.dev/token/get-access-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          shop: window.Shopify.shop,
        }),
      }
    );
    const tokenResponse = await token.json();
    return tokenResponse.token;
  }

  function showModal(modalId) {
    var modalElement = $(modalId);
    modalElement.css('display', 'block');
  }

  function hideModal(modalId) {
    var modalElement = $(modalId);
    modalElement.css('display', 'none');
  }

  async function main() {
    const userAccessToken = await getStoreToken();

    console.log('---');
    if (!userAccessToken || userAccessToken === '') {
      alert(
        "We're sorry, no token has been provided. To proceed, please register and add a valid token."
      );
    }

    // Tu código de jQuery aquí
    jQuery(document).ready(function ($) {
      var pluginDirUrl = $('#js_design_tool_div')
        .find('#js_design_tool_site_uri')
        .val();
      $('body').prepend("<div id='iframeHolder' style='display:none;'></div>");

      function postMessageScript() {
        // Aquí va la definición de tu función
        window.addEventListener(
          'message',
          async (event) => {
            if (event.origin !== 'https://designtool.aakronline.com') return;
            if (event.data) {
              let data = event.data;

              await addProductToCart(data, userAccessToken);
              let iframe = document.querySelector('#iframeHolder iframe');
              document.querySelector('#iframeHolder').style.display = 'none';

              const newUrl = 'https://' + window.Shopify.shop + '/cart';
              window.location.href = newUrl;
            }

            return event.data;
          },
          false
        );
      }
      $('body').prepend(
        $('<script>').attr('type', 'text/javascript').text(postMessageScript)
      );

      $('#aakron_artwork_design').click(function () {
        $('#js_spinner').css('display', 'block');
        var requestUri = $('#js_design_tool_div')
          .find('#js_design_tool_product_uri')
          .val();

        var toolProductSku = $('#js_design_tool_div').data('product-sku');
        var toolProductVirtualId = $('#js_design_tool_div').data(
          'product-virtual'
        );

        var queryParmeter =
          requestUri + '/' + toolProductSku + '/' + toolProductVirtualId;

        jQuery.ajax({
          type: 'post',
          url: 'https://flowzdesigntool.flowzcluster.tk/wp-admin/admin-ajax.php',
          data: {
            action: 'aakron_design_tool_validate_token',
            userAccessToken: userAccessToken,
            toolProductSku: toolProductSku,
            toolProductVirtualId: toolProductVirtualId,
          },
          success: function (response) {
            var resultObj = JSON.parse(response);
            console.log(resultObj);
            console.log(window.Shopify.shop);
            if (!$('#iframe').length) {
              $('#iframeHolder').html(
                '<a id="closeButton" style="text-decoration: none; cursor: pointer; position: fixed; top:5px; left: 15px; z-index: 10; font-size: 20px; font-weight:700">x</a> <iframe id="iframe" src="' +
                  queryParmeter +
                  '" style="display: block;width: 95%;position: fixed;height: 100%;z-index: 1111;left: 0;right: 0;margin: 0 auto;"></iframe>'
              );
              $('#closeButton').click(function () {
                $('#iframeHolder').css('display', 'none');
              });

              $('#iframeHolder iframe').on('load', function () {
                document
                  .querySelector('#iframeHolder iframe')
                  .contentWindow.postMessage(
                    { token: userAccessToken, origin: window.location.origin },
                    requestUri
                    // "*"
                  );
                $('#js_spinner').css('display', 'none');
                $('#iframeHolder').css('display', 'block');
              });
            } else {
              $('#js_spinner').css('display', 'none');
              $('#iframeHolder').css('display', 'block');
            }
          },
        });
      });
    });
  }

  if (typeof jQuery === 'undefined') {
    loadScript('https://code.jquery.com/jquery-3.6.0.min.js', function () {
      var $ = jQuery;

      main();
    });
  } else {
    main();
  }
})();
