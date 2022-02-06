<template>
  <div class="body-container">
        <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>

    <div class="hero__title-page">{{ $t("pages.staking.pageName") }}</div>
    <div class="hero__subTitle2" v-show="txtName == ''">
      Please make sure you are using
    </div>
    <div class="hero__subTitle3" v-show="txtName == ''">
      <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.org
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
        @keyup.enter="decryptWallet"
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

    <div class="hero__label" v-show="address !== null">Wallet Address</div>
    <div class="hero__title-addy">
      {{ address }}
    </div>
    <div class="hero__title">
      <div v-show="balance == null && address !== null">
        <div class="breeding-rhombus-spinner">
          <div class="rhombus child-1"></div>
          <div class="rhombus child-2"></div>
          <div class="rhombus child-3"></div>
          <div class="rhombus child-4"></div>
          <div class="rhombus child-5"></div>
          <div class="rhombus child-6"></div>
          <div class="rhombus child-7"></div>
          <div class="rhombus child-8"></div>
          <div class="rhombus big"></div>
        </div>
      </div>
    </div>
    <div class="hero__subTitle1" v-show="balance !== null">
      Available Balance
    </div>
    <div class="hero__bal" v-show="balance !== null">
      {{ balance }} <span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__subTitle1" v-show="staked !== null">Tokens In stake</div>
    <div class="hero__bal" v-show="staked !== null">
      {{ staked }} <span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__subTitle1" v-show="reward !== null">Unclaimed Reward</div>

    <div class="hero__bal" v-show="reward !== null">
      {{ reward }} <span class="hero__neat">NEAT</span>
    </div>

    <div class="hero__title" v-show="reward !== '0' && reward !== null">
      <button class="ripple" @click="neatClaim">CLAIM REWARD</button>
    </div>

    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="text"
        class="hero__input1"
        v-model="valPubKeyInput"
        placeholder="Validator Public Key"
      />
    </div>

    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="text"
        class="hero__input2"
        v-model="valPrivKeyInput"
        placeholder="Validator Private Key"
      />
    </div>

    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <div class="hero__title-ks">
        <button class="ripple" @click="neatReg">REGISTER</button>
      </div>
    </div>
        <div class="hero__title" v-show="txHash !== null">
      Executed!
      <div class="hero__subTitle2" v-show="txHash !== null">
        Transaction Hash ID is:
      </div>
      <div class="hero__subTitle3" v-show="txHash !== null">
        {{ txHash }}
      </div>
    </div>

    <div class="hero__title4">
      <div class="hero__subTitle2" v-show="staked !== '0' && staked !== null">
        !!! Danger Zone !!!
      </div>
      <div class="hero__title" v-show="staked !== '0' && staked !== null">
        <button class="ripple2" @click="neatUnreg">UN-REGISTER</button>
      </div>
    </div>

  </div>
</template>

<script>
const Account = require("neatio").account;
const KeyStore = require("neatio").keystore;
const Transaction = require("neatio").transaction;
const RPC = require("neatio").rpc;
const Nat = require("neatio").nat;
const Abi = require("neatio").abi;
const Utils = require("neatio").utils;
const URL = "https://ns1.neatio.org" || "https://ns2.neatio.org";

import axios from "axios";

export default {
  name: "StakingKS",

  data() {
    return {
      address: null,
      balance: null,
      txHash: null,
      valPubKeyInput: "",
      valPrivKeyInput: "",
      keyStore: null,
      passwd: null,
      privateKey: null,
      txtName: "",
      wallet: null,
      reward: null,
      staked: null,
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
      const address = this.address;

      const DATA = {
        jsonrpc: "2.0",
        method: "neat_getBalanceDetail",
        params: [`${address}`, "latest", true],
        id: 1,
      };
      setInterval(() => {
        axios.post(URL, DATA).then((response) => {
          (this.balance = Utils.toNEAT(
            Nat.toString(response.data.result.balance)
          )),
            (this.staked = Utils.toNEAT(
              Nat.toString(response.data.result.delegateBalance)
            )),
            (this.reward = Utils.toNEAT(
              Nat.toString(response.data.result.rewardBalance)
            ));
        });
      }, 3500);
    },

    async neatReg() {
      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const send = RPC(URL);
      const recipient = "NEATioMiningSmartContractAddress";
      const amount = "77000";
      const valPubKey = this.valPubKeyInput;
      const valPrivKey = this.valPrivKeyInput;
      const validatorPubKey = "0x" + valPubKey;
      const validatorPrivKey = "0x" + valPrivKey;
      const validatorSignature = await send("neat_signAddress", [
        userAccount.address,
        validatorPrivKey,
      ]);
      const contractMethod = Abi.methodID("Register", [
        "bytes",
        "bytes",
        "uint8",
      ]);
      const commission = 0;
      const validatorData = Abi.encodeParams(
        ["bytes", "bytes", "uint8"],
        [validatorPubKey, validatorSignature, commission]
      );
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("1000000000"),
        gas: Nat.fromString("10000000"),
        to: Utils.stringToHex(recipient),
        value: Nat.fromString(Utils.fromNEAT(amount)),
        data: contractMethod + validatorData.substring(2),
      };

      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
    },

    async neatClaim() {
      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const send = RPC(URL);
      const recipient = "NEATioMiningSmartContractAddress";
      const contractMethod = Abi.methodID("WithdrawReward", ["address"]);
      const validatorData = Abi.encodeParams(
        ["address"],
        [userAccount.address]
      );
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("10000000"),
        gas: Nat.fromString("10000000"),
        to: Utils.stringToHex(recipient),
        value: "0x0",
        data: contractMethod + validatorData.substring(2),
      };
      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
    },

    async neatUnreg() {
      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const send = RPC(URL);
      const recipient = "NEATioMiningSmartContractAddress";
      const contractMethod = Abi.methodID("UnRegister", []);
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("100000000"),
        gas: Nat.fromString("10000000"),
        to: Utils.stringToHex(recipient),
        value: "0x0",
        data: contractMethod,
      };
      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
    },
  },
};
</script>