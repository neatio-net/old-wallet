<template>
  <div class="body-container">
        <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>

    <div class="hero__title-page">{{ $t("pages.create.pageName") }}</div>
    <div class="hero__subTitle2">Please make sure you are using</div>
    <div class="hero__subTitle3">
      <b-icon-lock-fill></b-icon-lock-fill>https://wallet.neatio.org
    </div>

    <div class="hero__title" v-show="address !== null">
      <div class="hero__subTitle">{{ $t("pages.createPK.walletAddress") }}</div>
    </div>
    <div class="hero__title-addy">
      <span style="color: #dddddd">{{ address }}</span>
    </div>

    <div class="hero__title">
      <div class="hero__title-ks">
        <button class="ripple" @click="genWallet">GENERATE</button>
      </div>
    </div>

    <div class="hero__subTitle-ks" v-show="address !== null">
      <b-icon-info-square-fill font-scale="0.8"></b-icon-info-square-fill
      ><span style="color: #00bfff">{{
        $t("pages.createPK.disclaimer3")
      }}</span>
    </div>
    <div class="hero__subTitle-ks" v-show="address !== null">
      <b-icon-info-square-fill font-scale="0.8"></b-icon-info-square-fill
      ><span style="color: #00bfff">{{
        $t("pages.createPK.disclaimer4")
      }}</span>
    </div>
    <div class="hero__title">
      <div class="hero__title-ks">
        <button
          class="ripple"
          v-show="address !== null"
          @click="downloadPrivKey"
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const neatAccount = require("neatio").account;

export default {
  name: "CreatePK",

  data() {
    return { address: null, privKey: null };
  },

  methods: {
    genWallet() {
      const account = neatAccount.create();
      const address = account.address;
      const privKey = account.privateKey;
      this.account = account;
      this.address = address;
      this.privKey = privKey;
    },

    downloadPrivKey() {
      const linkNode = document.createElement("a");
      linkNode.download = this.account.address + ".txt";
      linkNode.style.display = "none";
      const blob = new Blob([JSON.stringify(this.privKey)]);
      linkNode.href = URL.createObjectURL(blob);
      document.body.appendChild(linkNode);
      linkNode.click();
      document.body.removeChild(linkNode);
    },
  },
};
</script>