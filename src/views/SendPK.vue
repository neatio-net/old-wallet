<template>
  <div class="body-container">
        <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page">{{ $t("pages.send.pageName") }}</div>
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

        <div class="hero__warn" v-show="address == null">{{ keyError }}</div>
    <div class="hero__title" v-show="address == null">
      <div class="hero__title-ks">
        <button class="ripple" @click="importKey">IMPORT</button>
      </div>
    </div>
    
    <div class="hero__Title" v-show="address !== null">Wallet Address</div>
    <div class="hero__title">
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
    <div class="hero__subTitle2" v-show="balance !== null">Your Balance</div>
    <div class="hero__bal" v-show="balance !== null">
      {{ balance }} <span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__title" v-show="address !== null"></div>
    <div class="hero__title" v-show="address !== null">
      <input
        type="text"
        class="hero__input1"
        v-model="addressToSend"
        placeholder="Destination Address"
      />
    </div>
    <div class="hero__title" v-show="address !== null">
      <input
        type="text"
        class="hero__input2"
        v-model="amountToSend"
        placeholder="Amount To Send"
      />
    </div>
    <div class="hero__title" v-show="address !== null">
      <div class="hero__title-ks">
        <button class="ripple" @click="neatSend">SEND</button>
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
  </div>
</template>

<script>
const Account = require("neatio").account;
const Transaction = require("neatio").transaction;
const RPC = require("neatio").rpc;
const Nat = require("neatio").nat;
const Utils = require("neatio").utils;
const URL = "https://ns1.neatio.org";

import axios from "axios";

export default {
  name: "SendPK",

  data() {
    return {
      keyInput: null,
      address: null,
      balance: null,
      txHash: null,
      amountToSend: null,
      addressToSend: null,
      keyError: null,
    };
  },

  methods: {
    importKey() {
      if (this.keyInput.length != 66) {
        const keyError = "Invalid private key!";
        this.keyError = keyError;
        console.log(keyError)
        return;
      }
      else {
      const privKey = this.keyInput;
      const wallet = Account.fromPrivate(privKey);
      this.address = wallet.address;
      this.privateKey = wallet.privateKey;
      const address = this.address;
      const DATA = {
        jsonrpc: "2.0",
        method: "neat_getBalance",
        params: [`${address}`, "latest"],
        id: 1,
      };

      setInterval(() => {
        axios
          .post(URL, DATA)
          .then(
            (response) =>
              (this.balance = Utils.toNEAT(Nat.toString(response.data.result)))
          );
      }, 3500);
    }
    },

    async neatSend() {
      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const send = RPC(URL);
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const recipient = this.addressToSend;
      const amount = this.amountToSend;
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("10000000000"),
        gas: Nat.fromString("1000000"),
        to: Utils.stringToHex(recipient),
        value: Nat.fromString(Utils.fromNEAT(amount)),
        data: "0x",
      };
      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
    },
  },
};
</script>