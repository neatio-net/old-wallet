<template>
  <div class="body-container">
    <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page">{{ $t("pages.home.pageName") }}</div>
    <div class="hero__title">{{ $t("pages.home.pageDesc") }}</div>

    <div class="section section--light">
      <div
        class="section__content section__content--thin-top content-container"
      >
        <div class="cards-grid">
          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--create">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Create NEW Wallet") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/create"
                  ><button class="ripple">CREATE</button></router-link
                >
              </div>
            </div>
          </div>

          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--send">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Send NEAT Tokens") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/send"
                  ><button class="ripple">SEND</button></router-link
                >
              </div>
            </div>
          </div>

          <div class="cards-grid__item">
            <div class="cards-grid__graphic">
              <div class="cards-grid__icon cards-grid__icon--stake">
                <span></span>
              </div>
            </div>
            <div class="cards-grid__title">
              {{ $t("Stake YOUR Claim!") }}
            </div>
            <div class="cards-grid__description">
              <div class="hero__title2">
                <router-link to="/staking"
                  ><button class="ripple">STAKE</button></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>