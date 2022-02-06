<template>
  <div class="body-container">
      <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page">{{ $t("pages.edtool.pageName") }}</div>
    <div class="hero__subTitle2">Please make sure you are using</div>
    <div class="hero__subTitle3">
      <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.org
    </div>
    <div class="hero__title" v-show="address == null">
      <input
        type="password"
        class="hero__inputs"
        v-model="keyInput"
        placeholder=" Enter Your Private Key In Here"
      />
    </div>

    <div class="hero__subTitle-ks" v-show="address == null">
      <b-icon-info-square-fill font-scale="0.8"></b-icon-info-square-fill
      >{{ $t("pages.createKS.disclaimer4") }}
    </div>
    <div class="hero__subTitle-ks" v-show="address == null">
      <b-icon-info-square-fill font-scale="0.8"></b-icon-info-square-fill
      >{{ $t("pages.createKS.disclaimer5") }}
    </div>
    <div class="hero__title-ks" v-show="address == null">
      <input
        type="password"
        class="hero__input-ks"
        v-model="pass1"
        placeholder=" Set your Password"
      />
    </div>
    <div class="hero__title" v-show="address == null">
      <input
        type="password"
        class="hero__input-ks"
        v-model="pass2"
        placeholder=" Re-type Password"
      />
    </div>

    <div class="hero__title" v-show="address !== null">
      <div class="hero__subTitle">
        {{ $t("This wallet PrivateKey successfully encrypted!") }}
      </div>
    </div>

    <div class="hero__title-addy">
      <span style="color: #dddddd">{{ address }}</span>
    </div>

    <div class="hero__title" v-show="address == null">
      <div class="hero__title-ks" v-show="address == null">
        <button class="ripple" @click="genWallet">ENCRYPT</button>
      </div>
    </div>

    <div v-show="address == null">{{ error1 }}</div>
    <div v-show="address == null">{{ error2 }}</div>
    <div v-show="address == null">{{ error3 }}</div>

    <div class="hero__subTitle-ks" v-show="address !== null">
      <b-icon-info-square-fill font-scale="0.8"></b-icon-info-square-fill
      ><span style="color: #00bfff">{{
        $t("pages.createKS.disclaimer2")
      }}</span>
    </div>

    <div class="hero__subTitle-ks" v-show="address !== null">
      <b-icon-info-square-fill font-scale="0.8"></b-icon-info-square-fill
      ><span style="color: #00bfff">{{
        $t("pages.createKS.disclaimer3")
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
const neatKeystore = require("neatio").keystore;

export default {
  name: "Encrypt",

  data() {
    return {
      address: null,
      privKey: null,
      pass1: "",
      pass2: "",
      error1: null,
      error2: null,
      error3: null,
    };
  },

  methods: {
    genWallet() {
      if (this.pass1.length == 0) {
        const error1 = "Password can't be empty!";
        this.error1 = error1;
        return;
      }
      if (this.pass2 !== this.pass1) {
        const error2 = "Passwords don't match!";
        this.error1 = error2;
        return;
      }
      if (this.pass1.length < 8) {
        const error2 = "Password is too short!";
        this.error1 = error2;
        return;
      } else {
        const privKey = this.keyInput;
        const wallet = neatAccount.fromPrivate(privKey);
        this.address = wallet.address;
        this.privateKey = wallet.privateKey;
        const address = this.address;
        const passwd = this.pass1;
        this.keystore = neatKeystore.toV3Keystore(
          wallet.privateKey,
          passwd,
          {}
        );
      }
    },

    downloadPrivKey() {
      const linkNode = document.createElement("a");
      linkNode.download = this.address + ".json";
      linkNode.style.display = "none";
      const blob = new Blob([JSON.stringify(this.keystore)]);
      linkNode.href = URL.createObjectURL(blob);
      document.body.appendChild(linkNode);
      linkNode.click();
      document.body.removeChild(linkNode);
    },
  },
};
</script>

<style scoped>
.btnDis {
  border: none;
  padding: 10px 17px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: not-allowed;
  color: #000;
  background-color: #424242;
  outline: none;
}
</style>