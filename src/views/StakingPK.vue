<template>
  <div class="body-container">
        <div class="hero__logo">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>

    <div class="hero__title-page">{{ $t("pages.staking.pageName") }}</div>
    <div class="hero__subTitle2" v-show="address == null">
      Please make sure you are using
    </div>
    <div class="hero__subTitle3" v-show="address == null">
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
    <div class="hero__subTitle1" v-show="balance !== null">
      Available balance
    </div>
    <div class="hero__bal" v-show="balance !== null">
      {{ balance }}<span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__subTitle1" v-show="staked !== null">Tokens In stake</div>
    <div class="hero__bal" v-show="balance !== null">
      {{ staked }} <span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__subTitle1" v-show="reward !== null">Unclaimed Reward</div>
    <div class="hero__bal" v-show="balance !== null">
      {{ reward }} <span class="hero__neat">NEAT</span>
    </div>

    <div class="hero__title4" v-show="reward !== '0' && reward !== null">
      <button class="ripple" @click="neatClaim">CLAIM REWARD</button>
    </div>

    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="password"
        class="hero__input1"
        v-model="valPubKeyInput"
        placeholder="Validator Public Key"
      />
    </div>
    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="password"
        class="hero__input2"
        v-model="valPrivKeyInput"
        placeholder="Validator Private Key"
      />
    </div>
    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <button class="ripple" @click="neatReg">REGISTER</button>
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
const Transaction = require("neatio").transaction;
const RPC = require("neatio").rpc;
const Nat = require("neatio").nat;
const Utils = require("neatio").utils;
const Abi = require("neatio").abi;
const URL = "https://ns1.neatio.org" || "https://ns2.neatio.org";

import axios from "axios";

export default {
  name: "StakingPK",

  data() {
    return {
      keyInput: null,
      address: null,
      balance: null,
      staked: null,
      reward: null,
      txHash: null,
      valPubKey: null,
      valPrivKey: null,
      moreToSend: null,
      valPubKeyInput: "",
      valPrivKeyInput: "",
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
        }
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
  },
};
</script>