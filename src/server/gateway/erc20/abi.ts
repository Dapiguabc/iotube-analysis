export const ABI = [{
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{
      name: "",
      type: "string"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "cycleIncrementalSupply",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "donationPoolAddress",
    outputs: [{
      name: "",
      type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{
      name: "",
      type: "uint8"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "",
      type: "address"
    }],
    name: "lastClaimViewIDs",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "unpause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "genesisPoolAddress",
    outputs: [{
      name: "",
      type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "vps",
    outputs: [{
      name: "",
      type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "paused",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "lastDonationPoolClaimViewID",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "_owner",
      type: "address"
    }],
    name: "balanceOf",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "pause",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "rewardPoolAddress",
    outputs: [{
      name: "",
      type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{
      name: "",
      type: "address"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "",
      type: "address"
    }],
    name: "authNonces",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{
      name: "",
      type: "string"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "lastRewardPoolClaimViewID",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "cycleLength",
    outputs: [{
      name: "",
      type: "uint8"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "newOwner",
      type: "address"
    }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{
        name: "_vps",
        type: "address"
      },
      {
        name: "_genesisPoolAddress",
        type: "address"
      },
      {
        name: "_rewardPoolAddress",
        type: "address"
      },
      {
        name: "_donationPoolAddress",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: false,
        name: "claimer",
        type: "address"
      },
      {
        indexed: false,
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        name: "amount",
        type: "uint256"
      },
      {
        indexed: false,
        name: "viewID",
        type: "uint256"
      }
    ],
    name: "Claim",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: false,
        name: "height",
        type: "uint256"
      },
      {
        indexed: false,
        name: "incremetnalSupply",
        type: "uint256"
      }
    ],
    name: "Decay",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
      indexed: false,
      name: "viewID",
      type: "uint256"
    }],
    name: "UpdateView",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Pause",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Unpause",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: true,
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    constant: false,
    inputs: [{
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_spender",
        type: "address"
      },
      {
        name: "_addedValue",
        type: "uint256"
      }
    ],
    name: "increaseApproval",
    outputs: [{
      name: "success",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_spender",
        type: "address"
      },
      {
        name: "_subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseApproval",
    outputs: [{
      name: "success",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "_newRewardPool",
      type: "address"
    }],
    name: "setRewardPoolAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "_newDonationPool",
      type: "address"
    }],
    name: "setDonationPoolAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "_newVPS",
      type: "address"
    }],
    name: "setVPS",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "cycle",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "stakingPoolSize",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "rewardPoolSize",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "donationPoolSize",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "incrementalSupply",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decayedIncrementalSupply",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "updateCycle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "owner",
      type: "address"
    }],
    name: "claimableAmount",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "claim",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "owner",
        type: "address"
      },
      {
        name: "signature",
        type: "bytes"
      },
      {
        name: "nonce",
        type: "uint256"
      }
    ],
    name: "claimAs",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
      name: "amount",
      type: "uint256"
    }],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

export const IOTUBEABI = [{
  "constant": true,
  "inputs": [],
  "name": "numOfActive",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},{
  "inputs": [{
    "internalType": "contract IAllowlist",
    "name": "_witnessList",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "address",
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "Pause",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "internalType": "bytes32",
    "name": "key",
    "type": "bytes32"
  }, {
    "indexed": false,
    "internalType": "address[]",
    "name": "witnesses",
    "type": "address[]"
  }],
  "name": "Settled",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [],
  "name": "Unpause",
  "type": "event"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "minters",
  "outputs": [{
    "internalType": "contract IMinter",
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "internalType": "address",
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "pause",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "paused",
  "outputs": [{
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "name": "settles",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "name": "tokenLists",
  "outputs": [{
    "internalType": "contract IAllowlist",
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "unpause",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "witnessList",
  "outputs": [{
    "internalType": "contract IAllowlist",
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "address",
    "name": "cashier",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "tokenAddr",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }, {
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }],
  "name": "generateKey",
  "outputs": [{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "bytes32[]",
    "name": "keys",
    "type": "bytes32[]"
  }],
  "name": "concatKeys",
  "outputs": [{
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "internalType": "address[]",
    "name": "cashiers",
    "type": "address[]"
  }, {
    "internalType": "address[]",
    "name": "tokenAddrs",
    "type": "address[]"
  }, {
    "internalType": "uint256[]",
    "name": "indexes",
    "type": "uint256[]"
  }, {
    "internalType": "address[]",
    "name": "senders",
    "type": "address[]"
  }, {
    "internalType": "address[]",
    "name": "recipients",
    "type": "address[]"
  }, {
    "internalType": "uint256[]",
    "name": "amounts",
    "type": "uint256[]"
  }, {
    "internalType": "bytes",
    "name": "signatures",
    "type": "bytes"
  }],
  "name": "submitMulti",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "address",
    "name": "tokenAddr",
    "type": "address"
  }],
  "name": "getTokenGroup",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "internalType": "bytes32",
    "name": "key",
    "type": "bytes32"
  }, {
    "internalType": "bytes",
    "name": "signatures",
    "type": "bytes"
  }],
  "name": "extractWitnesses",
  "outputs": [{
    "internalType": "address[]",
    "name": "witnesses",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "internalType": "address",
    "name": "cashier",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "tokenAddr",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "index",
    "type": "uint256"
  }, {
    "internalType": "address",
    "name": "from",
    "type": "address"
  }, {
    "internalType": "address",
    "name": "to",
    "type": "address"
  }, {
    "internalType": "uint256",
    "name": "amount",
    "type": "uint256"
  }, {
    "internalType": "bytes",
    "name": "signatures",
    "type": "bytes"
  }],
  "name": "submit",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "numOfPairs",
  "outputs": [{
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "internalType": "contract IAllowlist",
    "name": "_tokenList",
    "type": "address"
  }, {
    "internalType": "contract IMinter",
    "name": "_minter",
    "type": "address"
  }],
  "name": "addPair",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "internalType": "address",
    "name": "_newValidator",
    "type": "address"
  }],
  "name": "upgrade",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}]


export const XRC20ABI = [{
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{
      name: "",
      type: "string"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_spender",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_from",
        type: "address"
      },
      {
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{
      name: "",
      type: "uint8"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
      name: "_owner",
      type: "address"
    }],
    name: "balanceOf",
    outputs: [{
      name: "balance",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{
      name: "",
      type: "string"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{
        name: "_to",
        type: "address"
      },
      {
        name: "_value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [{
      name: "",
      type: "bool"
    }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [{
      name: "",
      type: "uint256"
    }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    payable: true,
    stateMutability: "payable",
    type: "fallback"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: true,
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  }
];