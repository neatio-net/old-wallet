<template>
  <div class="body-container">
    <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page">{{ $t("pages.edtool.pageName") }}</div>
    <div class="hero__title">{{ $t("pages.edtool.cardChoose") }}</div>

    <div class="section section--light">
      <div
        class="section__content section__content--thin-top content-container"
      >
        <div class="cards-grid">
          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--encrypt">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Encrypt PrivateKey") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/encrypt"
                  ><button class="ripple">ENCRYPT</button></router-link
                >
              </div>
            </div>
          </div>

          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--decrypt">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Decrypt PrivateKey") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/decrypt"
                  ><button class="ripple">DECRYPT</button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>