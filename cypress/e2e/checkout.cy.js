describe('End-to-End (E2E) UI Automation Testing - SauceDemo Checkout Flow', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  it('TC01 - Berhasil melakukan alur transaksi pembelian barang hingga selesai (Positive Test)', () => {
    // 1. Login dengan simulasi mengetik santai
    cy.get('[data-test="username"]').type('standard_user', { delay: 100 });
    cy.get('[data-test="password"]').type('secret_sauce', { delay: 100 });
    cy.wait(500);
    cy.get('[data-test="login-button"]').click();

    // Verifikasi masuk ke katalog produk
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.wait(1000);

    // 2. Tambah 2 produk ke keranjang
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.wait(500);
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '2');
    cy.wait(1000);

    // 3. Masuk ke halaman keranjang
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);
    cy.wait(1000);

    // 4. Masuk ke proses checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.wait(500);

    // 5. Isi form identitas penerima
    cy.get('[data-test="firstName"]').type('John', { delay: 100 });
    cy.get('[data-test="lastName"]').type('Doe', { delay: 100 });
    cy.get('[data-test="postalCode"]').type('12345', { delay: 100 });
    cy.wait(500);
    cy.get('[data-test="continue"]').click();

    // 6. Ringkasan belanja
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('contain.text', 'Total: $');
    cy.wait(1500);

    // 7. Selesaikan pemesanan
    cy.get('[data-test="finish"]').click();

    // 8. Verifikasi bukti order selesai
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    cy.get('.complete-text').should('contain.text', 'Your order has been dispatched');
    cy.wait(2500);
  });

  it('TC02 - Gagal melanjutkan checkout saat field identitas tidak diisi (Negative Test)', () => {
    // 1. Login
    cy.get('[data-test="username"]').type('standard_user', { delay: 100 });
    cy.get('[data-test="password"]').type('secret_sauce', { delay: 100 });
    cy.get('[data-test="login-button"]').click();
    cy.wait(1000);

    // 2. Tambah barang dan masuk checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.wait(1000);
    cy.get('[data-test="checkout"]').click();
    cy.wait(1000);

    // 3. Langsung klik Continue tanpa isi data
    cy.get('[data-test="continue"]').click();

    // 4. Assertion pesan error muncul
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain.text', 'Error: First Name is required');
    cy.wait(3000);
  });

});