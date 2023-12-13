# Enabling 'Start Design' Buttons and Product Preview on Shopify Website

This guide focuses on enabling the 'Start Design' buttons in the product section and the preview of personalized products in the cart section of your Shopify website.

## Steps

1. Navigate to your Shopify admin panel and go to the "Themes" section. Select the theme you wish to edit, click on the three dots, and choose "Edit Code."

![Shopify_Themes](/screenshots/Shopify_Themes.png)

![Texto alternativo](/screenshots/Edit_Code.png)

2.  A new page will open where you can edit your website's code. Here, you'll need to add some assets:

    - Go to the "Assets" folder and select "Add new Asset."

      ![Texto alternativo](/screenshots/Folder_assets.png)

    - Create a blank file.

      ![Texto alternativo](/screenshots/New_asset.png)

    - Add three assets to your website: - Add the asset "app.css." Ensure you select the extension as "css.liquid" for it to work correctly.
      ![Texto alternativo](/screenshots/Extension_css.png)
    - Copy the contents of your "app.css" file into a new file named "app.css.liquid."

      ![Texto alternativo](/screenshots/app_css_liquid.png)

    - Similarly, create a new asset named "app.js" with the "liquid" extension and paste the content of your "app.js" file into this new asset.

      ![Texto alternativo](/screenshots/Extension_js.png)

      ![Texto alternativo](/screenshots/app_js_liquid.png)

    - Repeat the process for the "cart_image.js" file.

      ![Texto alternativo](/screenshots/cart_image_js_liquid.png)

3.  Finally, locate your "product.liquid" and "cart.liquid" sections:

    - In "product.liquid," find the section where you want to add the 'Start Design' button. Copy the content of your "product.liquid" file and paste it into the desired section on your page, referencing the newly added assets, "app.css" and "app.js."

      ![Texto alternativo](/screenshots/product_liquid.png)

    - Move to the "cart.liquid" section, repeat the process by copying the content of your "cart_liquid" file, and paste it into your cart section. Locate the part of the code where you want to display an image of your personalized product and insert the content of your "cart.liquid" file there.

      ![Texto alternativo](/screenshots/cart_liquid.png)

4.  After completing these steps, the ability to create custom designs for your products through the 'Start Design' button should be enabled. Additionally, the preview of your personalized product in the shopping cart section of your website should also be functional.

![Texto alternativo](/screenshots/cart.png)
![Texto alternativo](/screenshots/product.png)

## Notes

- "product.liquid" and "cart.liquid" sections are standard in Shopify. If you're using a custom theme with different section names, follow the same steps in the corresponding files.
- The 'Start Design' button is given the className "btn" as per Shopify's standard. If your page or section uses a different className for buttons, replace "btn" with the className used for your website's button styles.
- When creating personalized products, several properties are added to the products. If your webpage displays all product details or properties, these new properties of the personalized product may also appear. Consider hiding these properties or modifying the code to display only the desired product properties.
