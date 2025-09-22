export type SpinX = {
    "address": "6W1JspEray9RAnC7oVFa6fHwcSdt9XkWyd7MShFkvGKw",
    "metadata": {
        "name": "spinx",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "closeCoinflip",
            "discriminator": [
                80,
                248,
                191,
                227,
                10,
                46,
                103,
                252
            ],
            "accounts": [
                {
                    "name": "signer",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "poolId"
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint",
                    "writable": true
                },
                {
                    "name": "creatorAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.creator_player",
                                "account": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "associatedTokenProgram",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "poolId",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "createCoinflip",
            "discriminator": [
                23,
                66,
                225,
                208,
                103,
                207,
                25,
                225
            ],
            "accounts": [
                {
                    "name": "creator",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "creatorAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "creator"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint"
                },
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "global_data.next_pool_id",
                                "account": "globalData"
                            }
                        ]
                    }
                },
                {
                    "name": "solVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "associatedTokenProgram",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "setNumber",
                    "type": "u8"
                },
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "initialize",
            "discriminator": [
                175,
                175,
                109,
                31,
                13,
                152,
                155,
                237
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "rent",
                    "address": "SysvarRent111111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "joinCoinflip",
            "discriminator": [
                79,
                207,
                215,
                111,
                215,
                83,
                146,
                56
            ],
            "accounts": [
                {
                    "name": "joiner",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "joinerAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "joiner"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint"
                },
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "poolId"
                            }
                        ]
                    }
                },
                {
                    "name": "solVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "random",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    114,
                                    97,
                                    110,
                                    100,
                                    111,
                                    109,
                                    110,
                                    101,
                                    115,
                                    115,
                                    45,
                                    114,
                                    101,
                                    113,
                                    117,
                                    101,
                                    115,
                                    116
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "force"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "treasury",
                    "writable": true
                },
                {
                    "name": "config",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    110,
                                    101,
                                    116,
                                    119,
                                    111,
                                    114,
                                    107,
                                    45,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103,
                                    117,
                                    114,
                                    97,
                                    116,
                                    105,
                                    111,
                                    110
                                ]
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "vrf",
                    "address": "VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y"
                },
                {
                    "name": "associatedTokenProgram",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "poolId",
                    "type": "u64"
                },
                {
                    "name": "force",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "setNumber",
                    "type": "u8"
                },
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "resultCoinflip",
            "discriminator": [
                68,
                245,
                37,
                216,
                48,
                235,
                13,
                48
            ],
            "accounts": [
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "poolId"
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint",
                    "writable": true
                },
                {
                    "name": "creatorAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.creator_player",
                                "account": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "joinerAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.joiner_player",
                                "account": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "treasury",
                    "writable": true
                },
                {
                    "name": "random",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    114,
                                    97,
                                    110,
                                    100,
                                    111,
                                    109,
                                    110,
                                    101,
                                    115,
                                    115,
                                    45,
                                    114,
                                    101,
                                    113,
                                    117,
                                    101,
                                    115,
                                    116
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "force"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "config",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    110,
                                    101,
                                    116,
                                    119,
                                    111,
                                    114,
                                    107,
                                    45,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103,
                                    117,
                                    114,
                                    97,
                                    116,
                                    105,
                                    111,
                                    110
                                ]
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "vrf",
                    "address": "VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "poolId",
                    "type": "u64"
                },
                {
                    "name": "force",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                }
            ]
        },
        {
            "name": "setGlobalData",
            "discriminator": [
                210,
                202,
                176,
                221,
                143,
                119,
                203,
                194
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "coinflipFee",
                    "type": "u64"
                },
                {
                    "name": "treasuryWallet",
                    "type": "pubkey"
                },
                {
                    "name": "minAmount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdrawFee",
            "discriminator": [
                14,
                122,
                231,
                218,
                31,
                238,
                223,
                150
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "solVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "treasuryWallet",
                    "writable": true
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "solVaultBump",
                    "type": "u8"
                },
                {
                    "name": "feeAmount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "coinflipPool",
            "discriminator": [
                229,
                76,
                223,
                98,
                52,
                198,
                100,
                194
            ]
        },
        {
            "name": "globalData",
            "discriminator": [
                48,
                194,
                194,
                186,
                46,
                71,
                131,
                61
            ]
        },
        {
            "name": "networkState",
            "discriminator": [
                212,
                237,
                148,
                56,
                97,
                245,
                51,
                169
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "invalidAdmin",
            "msg": "Invalid Admin Address"
        },
        {
            "code": 6001,
            "name": "invalidCreator",
            "msg": "Invalid Creator Address"
        },
        {
            "code": 6002,
            "name": "invalidClaimStatus",
            "msg": "Invalid Claim Status"
        },
        {
            "code": 6003,
            "name": "alreadyClaimed",
            "msg": "Already Claimed Game"
        },
        {
            "code": 6004,
            "name": "alreadyDrawn",
            "msg": "Already Drawn Game"
        },
        {
            "code": 6005,
            "name": "notWinner",
            "msg": "The Account is Not Winner"
        },
        {
            "code": 6006,
            "name": "tokenNotAllowed",
            "msg": "Token not allowed"
        },
        {
            "code": 6007,
            "name": "ownerMismatch",
            "msg": "Owner mismatch"
        },
        {
            "code": 6008,
            "name": "invalidAmount",
            "msg": "Invalid Bet Amount"
        },
        {
            "code": 6009,
            "name": "invalidJoiner",
            "msg": "Invalid Joiner"
        },
        {
            "code": 6010,
            "name": "invalidNumber",
            "msg": "Invalid Bet Number"
        },
        {
            "code": 6011,
            "name": "amountTooSmall",
            "msg": "Amount is too small"
        },
        {
            "code": 6012,
            "name": "challengeTaken",
            "msg": "Challenge already taken"
        },
        {
            "code": 6013,
            "name": "challengeNotTaken",
            "msg": "Challenge not taken"
        },
        {
            "code": 6014,
            "name": "challengeCompleted",
            "msg": "Challenge already completed"
        },
        {
            "code": 6015,
            "name": "challengeCancelled",
            "msg": "Challenge already cancelled"
        },
        {
            "code": 6016,
            "name": "notChallengeCreator",
            "msg": "Not the challenge creator"
        },
        {
            "code": 6017,
            "name": "notTreasuryAuthority",
            "msg": "Not the treasury authority"
        },
        {
            "code": 6018,
            "name": "invalidVrfResult",
            "msg": "Invalid VRF result"
        },
        {
            "code": 6019,
            "name": "insufficientFunds",
            "msg": "Insufficient funds"
        },
        {
            "code": 6020,
            "name": "stillProcessing",
            "msg": "Randomness is still being fulfilled"
        }
    ],
    "types": [
        {
            "name": "coinflipPool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "poolId",
                        "type": "u64"
                    },
                    {
                        "name": "startTs",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "winner",
                        "type": "pubkey"
                    },
                    {
                        "name": "poolAmount",
                        "type": "u64"
                    },
                    {
                        "name": "creatorPlayer",
                        "type": "pubkey"
                    },
                    {
                        "name": "creatorAta",
                        "type": "pubkey"
                    },
                    {
                        "name": "creatorAmount",
                        "type": "u64"
                    },
                    {
                        "name": "creatorSetNumber",
                        "type": "u8"
                    },
                    {
                        "name": "joinerPlayer",
                        "type": "pubkey"
                    },
                    {
                        "name": "joinerAta",
                        "type": "pubkey"
                    },
                    {
                        "name": "joinerAmount",
                        "type": "u64"
                    },
                    {
                        "name": "joinerSetNumber",
                        "type": "u8"
                    },
                    {
                        "name": "force",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "status",
                        "type": {
                            "defined": {
                                "name": "poolStatus"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "globalData",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "superAdmin",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasuryWallet",
                        "type": "pubkey"
                    },
                    {
                        "name": "coinflipFee",
                        "type": "u64"
                    },
                    {
                        "name": "spinxToken",
                        "type": "pubkey"
                    },
                    {
                        "name": "nextPoolId",
                        "type": "u64"
                    },
                    {
                        "name": "minAmount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "networkConfiguration",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury",
                        "type": "pubkey"
                    },
                    {
                        "name": "requestFee",
                        "type": "u64"
                    },
                    {
                        "name": "fulfillmentAuthorities",
                        "type": {
                            "vec": "pubkey"
                        }
                    },
                    {
                        "name": "tokenFeeConfig",
                        "type": {
                            "option": {
                                "defined": {
                                    "name": "oraoTokenFeeConfig"
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "networkState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "config",
                        "type": {
                            "defined": {
                                "name": "networkConfiguration"
                            }
                        }
                    },
                    {
                        "name": "numReceived",
                        "docs": [
                            "Total number of received requests."
                        ],
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "oraoTokenFeeConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "mint",
                        "docs": [
                            "ORAO token mint address."
                        ],
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury",
                        "docs": [
                            "ORAO token treasury account."
                        ],
                        "type": "pubkey"
                    },
                    {
                        "name": "fee",
                        "docs": [
                            "Fee in ORAO SPL token smallest units."
                        ],
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "poolStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "waiting"
                    },
                    {
                        "name": "processing"
                    },
                    {
                        "name": "finished"
                    },
                    {
                        "name": "closed"
                    }
                ]
            }
        }
    ]
};

export const IDL: SpinX = {
    "address": "6W1JspEray9RAnC7oVFa6fHwcSdt9XkWyd7MShFkvGKw",
    "metadata": {
        "name": "spinx",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "closeCoinflip",
            "discriminator": [
                80,
                248,
                191,
                227,
                10,
                46,
                103,
                252
            ],
            "accounts": [
                {
                    "name": "signer",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "poolId"
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint",
                    "writable": true
                },
                {
                    "name": "creatorAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.creator_player",
                                "account": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "associatedTokenProgram",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "poolId",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "createCoinflip",
            "discriminator": [
                23,
                66,
                225,
                208,
                103,
                207,
                25,
                225
            ],
            "accounts": [
                {
                    "name": "creator",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "creatorAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "creator"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint"
                },
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "global_data.next_pool_id",
                                "account": "globalData"
                            }
                        ]
                    }
                },
                {
                    "name": "solVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "associatedTokenProgram",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "setNumber",
                    "type": "u8"
                },
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "initialize",
            "discriminator": [
                175,
                175,
                109,
                31,
                13,
                152,
                155,
                237
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "rent",
                    "address": "SysvarRent111111111111111111111111111111111"
                }
            ],
            "args": []
        },
        {
            "name": "joinCoinflip",
            "discriminator": [
                79,
                207,
                215,
                111,
                215,
                83,
                146,
                56
            ],
            "accounts": [
                {
                    "name": "joiner",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "joinerAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "joiner"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint"
                },
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "poolId"
                            }
                        ]
                    }
                },
                {
                    "name": "solVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "random",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    114,
                                    97,
                                    110,
                                    100,
                                    111,
                                    109,
                                    110,
                                    101,
                                    115,
                                    115,
                                    45,
                                    114,
                                    101,
                                    113,
                                    117,
                                    101,
                                    115,
                                    116
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "force"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "treasury",
                    "writable": true
                },
                {
                    "name": "config",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    110,
                                    101,
                                    116,
                                    119,
                                    111,
                                    114,
                                    107,
                                    45,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103,
                                    117,
                                    114,
                                    97,
                                    116,
                                    105,
                                    111,
                                    110
                                ]
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "vrf",
                    "address": "VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y"
                },
                {
                    "name": "associatedTokenProgram",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "poolId",
                    "type": "u64"
                },
                {
                    "name": "force",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                },
                {
                    "name": "setNumber",
                    "type": "u8"
                },
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "resultCoinflip",
            "discriminator": [
                68,
                245,
                37,
                216,
                48,
                235,
                13,
                48
            ],
            "accounts": [
                {
                    "name": "coinflipPool",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    99,
                                    111,
                                    105,
                                    110,
                                    102,
                                    108,
                                    105,
                                    112,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "poolId"
                            }
                        ]
                    }
                },
                {
                    "name": "splEscrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "spinxMint",
                    "writable": true
                },
                {
                    "name": "creatorAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.creator_player",
                                "account": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "joinerAta",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.joiner_player",
                                "account": "coinflipPool"
                            },
                            {
                                "kind": "const",
                                "value": [
                                    6,
                                    221,
                                    246,
                                    225,
                                    215,
                                    101,
                                    161,
                                    147,
                                    217,
                                    203,
                                    225,
                                    70,
                                    206,
                                    235,
                                    121,
                                    172,
                                    28,
                                    180,
                                    133,
                                    237,
                                    95,
                                    91,
                                    55,
                                    145,
                                    58,
                                    140,
                                    245,
                                    133,
                                    126,
                                    255,
                                    0,
                                    169
                                ]
                            },
                            {
                                "kind": "account",
                                "path": "spinxMint"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ]
                        }
                    }
                },
                {
                    "name": "treasury",
                    "writable": true
                },
                {
                    "name": "random",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    114,
                                    97,
                                    110,
                                    100,
                                    111,
                                    109,
                                    110,
                                    101,
                                    115,
                                    115,
                                    45,
                                    114,
                                    101,
                                    113,
                                    117,
                                    101,
                                    115,
                                    116
                                ]
                            },
                            {
                                "kind": "arg",
                                "path": "force"
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "config",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    111,
                                    114,
                                    97,
                                    111,
                                    45,
                                    118,
                                    114,
                                    102,
                                    45,
                                    110,
                                    101,
                                    116,
                                    119,
                                    111,
                                    114,
                                    107,
                                    45,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103,
                                    117,
                                    114,
                                    97,
                                    116,
                                    105,
                                    111,
                                    110
                                ]
                            }
                        ],
                        "program": {
                            "kind": "const",
                            "value": [
                                7,
                                71,
                                177,
                                26,
                                250,
                                145,
                                180,
                                209,
                                249,
                                34,
                                242,
                                123,
                                14,
                                186,
                                193,
                                218,
                                178,
                                59,
                                33,
                                41,
                                164,
                                190,
                                243,
                                79,
                                50,
                                164,
                                123,
                                88,
                                245,
                                206,
                                252,
                                120
                            ]
                        }
                    }
                },
                {
                    "name": "vrf",
                    "address": "VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "poolId",
                    "type": "u64"
                },
                {
                    "name": "force",
                    "type": {
                        "array": [
                            "u8",
                            32
                        ]
                    }
                }
            ]
        },
        {
            "name": "setGlobalData",
            "discriminator": [
                210,
                202,
                176,
                221,
                143,
                119,
                203,
                194
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                }
            ],
            "args": [
                {
                    "name": "coinflipFee",
                    "type": "u64"
                },
                {
                    "name": "treasuryWallet",
                    "type": "pubkey"
                },
                {
                    "name": "minAmount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "withdrawFee",
            "discriminator": [
                14,
                122,
                231,
                218,
                31,
                238,
                223,
                150
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "globalData",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "solVault",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const",
                                "value": [
                                    118,
                                    97,
                                    117,
                                    108,
                                    116,
                                    45,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ]
                            }
                        ]
                    }
                },
                {
                    "name": "treasuryWallet",
                    "writable": true
                },
                {
                    "name": "systemProgram",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "tokenProgram",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "solVaultBump",
                    "type": "u8"
                },
                {
                    "name": "feeAmount",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "coinflipPool",
            "discriminator": [
                229,
                76,
                223,
                98,
                52,
                198,
                100,
                194
            ]
        },
        {
            "name": "globalData",
            "discriminator": [
                48,
                194,
                194,
                186,
                46,
                71,
                131,
                61
            ]
        },
        {
            "name": "networkState",
            "discriminator": [
                212,
                237,
                148,
                56,
                97,
                245,
                51,
                169
            ]
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "invalidAdmin",
            "msg": "Invalid Admin Address"
        },
        {
            "code": 6001,
            "name": "invalidCreator",
            "msg": "Invalid Creator Address"
        },
        {
            "code": 6002,
            "name": "invalidClaimStatus",
            "msg": "Invalid Claim Status"
        },
        {
            "code": 6003,
            "name": "alreadyClaimed",
            "msg": "Already Claimed Game"
        },
        {
            "code": 6004,
            "name": "alreadyDrawn",
            "msg": "Already Drawn Game"
        },
        {
            "code": 6005,
            "name": "notWinner",
            "msg": "The Account is Not Winner"
        },
        {
            "code": 6006,
            "name": "tokenNotAllowed",
            "msg": "Token not allowed"
        },
        {
            "code": 6007,
            "name": "ownerMismatch",
            "msg": "Owner mismatch"
        },
        {
            "code": 6008,
            "name": "invalidAmount",
            "msg": "Invalid Bet Amount"
        },
        {
            "code": 6009,
            "name": "invalidJoiner",
            "msg": "Invalid Joiner"
        },
        {
            "code": 6010,
            "name": "invalidNumber",
            "msg": "Invalid Bet Number"
        },
        {
            "code": 6011,
            "name": "amountTooSmall",
            "msg": "Amount is too small"
        },
        {
            "code": 6012,
            "name": "challengeTaken",
            "msg": "Challenge already taken"
        },
        {
            "code": 6013,
            "name": "challengeNotTaken",
            "msg": "Challenge not taken"
        },
        {
            "code": 6014,
            "name": "challengeCompleted",
            "msg": "Challenge already completed"
        },
        {
            "code": 6015,
            "name": "challengeCancelled",
            "msg": "Challenge already cancelled"
        },
        {
            "code": 6016,
            "name": "notChallengeCreator",
            "msg": "Not the challenge creator"
        },
        {
            "code": 6017,
            "name": "notTreasuryAuthority",
            "msg": "Not the treasury authority"
        },
        {
            "code": 6018,
            "name": "invalidVrfResult",
            "msg": "Invalid VRF result"
        },
        {
            "code": 6019,
            "name": "insufficientFunds",
            "msg": "Insufficient funds"
        },
        {
            "code": 6020,
            "name": "stillProcessing",
            "msg": "Randomness is still being fulfilled"
        }
    ],
    "types": [
        {
            "name": "coinflipPool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "poolId",
                        "type": "u64"
                    },
                    {
                        "name": "startTs",
                        "type": "u64"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    },
                    {
                        "name": "winner",
                        "type": "pubkey"
                    },
                    {
                        "name": "poolAmount",
                        "type": "u64"
                    },
                    {
                        "name": "creatorPlayer",
                        "type": "pubkey"
                    },
                    {
                        "name": "creatorAta",
                        "type": "pubkey"
                    },
                    {
                        "name": "creatorAmount",
                        "type": "u64"
                    },
                    {
                        "name": "creatorSetNumber",
                        "type": "u8"
                    },
                    {
                        "name": "joinerPlayer",
                        "type": "pubkey"
                    },
                    {
                        "name": "joinerAta",
                        "type": "pubkey"
                    },
                    {
                        "name": "joinerAmount",
                        "type": "u64"
                    },
                    {
                        "name": "joinerSetNumber",
                        "type": "u8"
                    },
                    {
                        "name": "force",
                        "type": {
                            "array": [
                                "u8",
                                32
                            ]
                        }
                    },
                    {
                        "name": "status",
                        "type": {
                            "defined": {
                                "name": "poolStatus"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "globalData",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "superAdmin",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasuryWallet",
                        "type": "pubkey"
                    },
                    {
                        "name": "coinflipFee",
                        "type": "u64"
                    },
                    {
                        "name": "spinxToken",
                        "type": "pubkey"
                    },
                    {
                        "name": "nextPoolId",
                        "type": "u64"
                    },
                    {
                        "name": "minAmount",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "networkConfiguration",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury",
                        "type": "pubkey"
                    },
                    {
                        "name": "requestFee",
                        "type": "u64"
                    },
                    {
                        "name": "fulfillmentAuthorities",
                        "type": {
                            "vec": "pubkey"
                        }
                    },
                    {
                        "name": "tokenFeeConfig",
                        "type": {
                            "option": {
                                "defined": {
                                    "name": "oraoTokenFeeConfig"
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "networkState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "config",
                        "type": {
                            "defined": {
                                "name": "networkConfiguration"
                            }
                        }
                    },
                    {
                        "name": "numReceived",
                        "docs": [
                            "Total number of received requests."
                        ],
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "oraoTokenFeeConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "mint",
                        "docs": [
                            "ORAO token mint address."
                        ],
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury",
                        "docs": [
                            "ORAO token treasury account."
                        ],
                        "type": "pubkey"
                    },
                    {
                        "name": "fee",
                        "docs": [
                            "Fee in ORAO SPL token smallest units."
                        ],
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "poolStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "waiting"
                    },
                    {
                        "name": "processing"
                    },
                    {
                        "name": "finished"
                    },
                    {
                        "name": "closed"
                    }
                ]
            }
        }
    ]
};
