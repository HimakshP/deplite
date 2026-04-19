/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/deplite.json`.
 */
export type Deplite = {
  "address": "C8s478Z3a9BFHEbv5TvZ4iSzw98brqJppAcsYYdrzzDu",
  "metadata": {
    "name": "deplite",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeFlag",
      "discriminator": [
        233,
        206,
        136,
        55,
        250,
        237,
        132,
        51
      ],
      "accounts": [
        {
          "name": "flag",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  97,
                  116,
                  117,
                  114,
                  101,
                  95,
                  102,
                  108,
                  97,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "flag.admin",
                "account": "flagAccount"
              },
              {
                "kind": "account",
                "path": "flag.name",
                "account": "flagAccount"
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "initializeFlag",
      "discriminator": [
        15,
        172,
        112,
        114,
        230,
        132,
        130,
        9
      ],
      "accounts": [
        {
          "name": "flag",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  97,
                  116,
                  117,
                  114,
                  101,
                  95,
                  102,
                  108,
                  97,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "admin"
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "toggleFlag",
      "discriminator": [
        238,
        172,
        59,
        94,
        221,
        184,
        127,
        115
      ],
      "accounts": [
        {
          "name": "flag",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  101,
                  97,
                  116,
                  117,
                  114,
                  101,
                  95,
                  102,
                  108,
                  97,
                  103
                ]
              },
              {
                "kind": "account",
                "path": "flag.admin",
                "account": "flagAccount"
              },
              {
                "kind": "account",
                "path": "flag.name",
                "account": "flagAccount"
              }
            ]
          }
        },
        {
          "name": "admin",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "enabled",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "flagAccount",
      "discriminator": [
        211,
        66,
        209,
        99,
        201,
        95,
        120,
        69
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized access"
    },
    {
      "code": 6001,
      "name": "nameTooLong",
      "msg": "Flag name too long"
    }
  ],
  "types": [
    {
      "name": "flagAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
          },
          {
            "name": "enabled",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "name",
            "type": "string"
          }
        ]
      }
    }
  ]
};
