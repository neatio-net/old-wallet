<template>
  <div class="body-container">
      <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page">{{ $t("pages.edtool.pageName") }}</div>
    <div class="hero__subTitle2" v-show="txtName == ''">
      Please make sure you are using
    </div>
    <div class="hero__subTitle3" v-show="txtName == ''">
      <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.org
    </div>
    <div class="hero__logo" v-show="privateKey != null">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__Title" v-show="txtName !== '' && address == null">
      KeyStore File Loaded
    </div>
    <div class="hero__walFile" v-show="txtName !== '' && address == null">
      {{ txtName }}
    </div>

    <div class="hero__title" v-show="txtName == '' && address == null">
      <button class="ripple" @click="selectKeyStore">IMPORT KEYSTORE</button>
    </div>

    <input
      @change="onFileChange"
      style="display: none"
      id="f"
      ref="f"
      type="file"
    />
    <div class="hero__title" v-show="address == null">
      <input
        type="password"
        class="hero__inputs"
        v-show="txtName !== ''"
        v-model="passwd"
        placeholder="Wallet Password"
      />
    </div>

    <div class="hero__title" v-show="txtName !== '' && address == null">
      <div class="hero__title-ks">
        <button class="ripple" @click="decryptWallet">DECRYPT</button>
      </div>
    </div>

    <div class="hero__title">
      {{ address }}
    </div>
    <div class="hero__privKeyTitle" v-show="address !== null">
      Account Successfully Decrypted!
    </div>

    <div class="hero__title">
      <div class="hero__title-ks">
        <button
          class="ripple"
          v-show="privateKey !== null"
          @click="downloadPrivKey"
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const Account = require("neatio").account;
const KeyStore = require("neatio").keystore;

const Nat = require("neatio").nat;
const Utils = require("neatio").utils;

export default {
  name: "SendKS",

  data() {
    return {
      address: null,
      balance: null,
      txHash: null,
      amountToSend: null,
      addressToSend: null,
      keyStore: null,
      passwd: null,
      privateKey: null,
      txtName: "",
      wallet: null,
      neatBalance: null,
    };
  },

  methods: {
    selectKeyStore() {
      document.getElementById("f").click();
    },

    onFileChange(f) {
      const vm = this;
      const file = document.getElementById("f").files[0];
      const txtName = file.name;
      this.txtName = txtName;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        vm.keyStore = this.result;
      };
    },

    decryptWallet() {
      const account = KeyStore.fromV3Keystore(
        JSON.parse(this.keyStore),
        this.passwd
      );
      const privKey = account.privateKey;
      const wallet = Account.fromPrivate(privKey);
      this.address = wallet.address;
      this.privateKey = wallet.privateKey;

      const address = account.address;
      const addyPrivKey = account.privateKey;
      this.address = address;
      this.addyPrivKey = addyPrivKey;

      const addy = account.address;
      this.account = account;
    },

    downloadPrivKey() {
      const linkNode = document.createElement("a");
      linkNode.download = this.account.address + ".txt";
      linkNode.style.display = "none";
      const blob = new Blob([JSON.stringify(this.privateKey)]);
      linkNode.href = URL.createObjectURL(blob);
      document.body.appendChild(linkNode);
      linkNode.click();
      document.body.removeChild(linkNode);
    },
  },
};
</script>