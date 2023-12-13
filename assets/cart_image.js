function injectDesignImages(cart) {
  try {
    cart.items.forEach((item, index) => {
      const designImage = item.properties != null && item.properties._imageFull;
      console.log(designImage);
      if (designImage) {
        const newImage = item.properties._imageFull;

        const itemDetails = document.querySelectorAll('.cart-item__details')[
          index
        ];

        const imgElement = document.createElement('img');
        imgElement.src = newImage;
        imgElement.alt = 'Imagen del diseño';
        imgElement.style.maxWidth = '100px';

        const linkElement = document.createElement('a');
        linkElement.href = newImage;
        linkElement.appendChild(imgElement);

        itemDetails.appendChild(linkElement);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

function fetchCartAndInjectDesignImages() {
  fetch(window.Shopify.routes.root + 'cart.js', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      await response.json().then((cart) => {
        injectDesignImages(cart);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

fetchCartAndInjectDesignImages();
