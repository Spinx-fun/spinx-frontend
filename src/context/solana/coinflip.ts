export type SpinX = {
    "address": "GjbMbmaKX8jB5TrH91AZ6xZwFPeq7fgPkZVDhjGcBUdd",
    "metadata": {
        "name": "spinx",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "create_coinflip",
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
                    "name": "global_data",
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
                    "name": "creator_ata",
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
                                "path": "spinx_mint"
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
                    "name": "spinx_mint"
                },
                {
                    "name": "coinflip_pool",
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
                                "account": "GlobalData"
                            }
                        ]
                    }
                },
                {
                    "name": "sol_vault",
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
                    "name": "spl_escrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool"
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
                                "path": "spinx_mint"
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
                    "name": "associated_token_program",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "set_number",
                    "type": "u64"
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
                    "name": "global_data",
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
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
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
            "name": "join_coinflip",
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
                    "name": "global_data",
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
                    "name": "joiner_ata",
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
                                "path": "spinx_mint"
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
                    "name": "spinx_mint"
                },
                {
                    "name": "coinflip_pool",
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
                                "path": "pool_id"
                            }
                        ]
                    }
                },
                {
                    "name": "sol_vault",
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
                    "name": "spl_escrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool"
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
                                "path": "spinx_mint"
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
                    "name": "associated_token_program",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "pool_id",
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
                    "name": "set_number",
                    "type": "u64"
                },
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "result_coinflip",
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
                    "name": "coinflip_pool",
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
                                "path": "pool_id"
                            }
                        ]
                    }
                },
                {
                    "name": "spl_escrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool"
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
                                "path": "spinx_mint"
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
                    "name": "spinx_mint",
                    "writable": true
                },
                {
                    "name": "creator_ata",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.creator_player",
                                "account": "CoinflipPool"
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
                                "path": "spinx_mint"
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
                    "name": "joiner_ata",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.joiner_player",
                                "account": "CoinflipPool"
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
                                "path": "spinx_mint"
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
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "pool_id",
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
            "name": "set_fee",
            "discriminator": [
                18,
                154,
                24,
                18,
                237,
                214,
                19,
                80
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "global_data",
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
                    "name": "coinflip_fee",
                    "type": "u64"
                },
                {
                    "name": "treasury_wallet",
                    "type": "pubkey"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "CoinflipPool",
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
            "name": "GlobalData",
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
            "name": "NetworkState",
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
            "name": "InvalidAdmin",
            "msg": "Invalid Admin Address"
        },
        {
            "code": 6001,
            "name": "AlreadyClaimed",
            "msg": "Already Claimed Game"
        },
        {
            "code": 6002,
            "name": "AlreadyDrawn",
            "msg": "Already Drawn Game"
        },
        {
            "code": 6003,
            "name": "NotWinner",
            "msg": "The Account is Not Winner"
        },
        {
            "code": 6004,
            "name": "NotReferrer",
            "msg": "The Account is Not Referrer"
        },
        {
            "code": 6005,
            "name": "TokenNotAllowed",
            "msg": "Token not allowed"
        },
        {
            "code": 6006,
            "name": "OwnerMismatch",
            "msg": "Owner mismatch"
        },
        {
            "code": 6007,
            "name": "InvalidAmount",
            "msg": "Invalid Bet Amount"
        },
        {
            "code": 6008,
            "name": "InvalidJoiner",
            "msg": "Invalid Joiner"
        },
        {
            "code": 6009,
            "name": "InvalidNumber",
            "msg": "Invalid Bet Number"
        },
        {
            "code": 6010,
            "name": "ChallengeTaken",
            "msg": "Challenge already taken"
        },
        {
            "code": 6011,
            "name": "ChallengeNotTaken",
            "msg": "Challenge not taken"
        },
        {
            "code": 6012,
            "name": "ChallengeCompleted",
            "msg": "Challenge already completed"
        },
        {
            "code": 6013,
            "name": "ChallengeCancelled",
            "msg": "Challenge already cancelled"
        },
        {
            "code": 6014,
            "name": "NotChallengeCreator",
            "msg": "Not the challenge creator"
        },
        {
            "code": 6015,
            "name": "NotTreasuryAuthority",
            "msg": "Not the treasury authority"
        },
        {
            "code": 6016,
            "name": "InvalidVRFResult",
            "msg": "Invalid VRF result"
        },
        {
            "code": 6017,
            "name": "InsufficientFunds",
            "msg": "Insufficient funds"
        },
        {
            "code": 6018,
            "name": "StillProcessing",
            "msg": "Randomness is still being fulfilled"
        }
    ],
    "types": [
        {
            "name": "CoinflipPool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool_id",
                        "type": "u64"
                    },
                    {
                        "name": "start_ts",
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
                        "name": "pool_amount",
                        "type": "u64"
                    },
                    {
                        "name": "creator_player",
                        "type": "pubkey"
                    },
                    {
                        "name": "creator_ata",
                        "type": "pubkey"
                    },
                    {
                        "name": "creator_amount",
                        "type": "u64"
                    },
                    {
                        "name": "creator_set_number",
                        "type": "u64"
                    },
                    {
                        "name": "joiner_player",
                        "type": "pubkey"
                    },
                    {
                        "name": "joiner_ata",
                        "type": "pubkey"
                    },
                    {
                        "name": "joiner_amount",
                        "type": "u64"
                    },
                    {
                        "name": "joiner_set_number",
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
                        "name": "status",
                        "type": {
                            "defined": {
                                "name": "PoolStatus"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "GlobalData",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "super_admin",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury_wallet",
                        "type": "pubkey"
                    },
                    {
                        "name": "coinflip_fee",
                        "type": "u64"
                    },
                    {
                        "name": "spinx_token",
                        "type": "pubkey"
                    },
                    {
                        "name": "next_pool_id",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "NetworkConfiguration",
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
                        "name": "request_fee",
                        "type": "u64"
                    },
                    {
                        "name": "fulfillment_authorities",
                        "type": {
                            "vec": "pubkey"
                        }
                    },
                    {
                        "name": "token_fee_config",
                        "type": {
                            "option": {
                                "defined": {
                                    "name": "OraoTokenFeeConfig"
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "NetworkState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "config",
                        "type": {
                            "defined": {
                                "name": "NetworkConfiguration"
                            }
                        }
                    },
                    {
                        "name": "num_received",
                        "docs": [
                            "Total number of received requests."
                        ],
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "OraoTokenFeeConfig",
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
            "name": "PoolStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Waiting"
                    },
                    {
                        "name": "Processing"
                    },
                    {
                        "name": "Finished"
                    }
                ]
            }
        }
    ]
};

export const IDL: SpinX = {
    "address": "GjbMbmaKX8jB5TrH91AZ6xZwFPeq7fgPkZVDhjGcBUdd",
    "metadata": {
        "name": "spinx",
        "version": "0.1.0",
        "spec": "0.1.0",
        "description": "Created with Anchor"
    },
    "instructions": [
        {
            "name": "create_coinflip",
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
                    "name": "global_data",
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
                    "name": "creator_ata",
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
                                "path": "spinx_mint"
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
                    "name": "spinx_mint"
                },
                {
                    "name": "coinflip_pool",
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
                                "account": "GlobalData"
                            }
                        ]
                    }
                },
                {
                    "name": "sol_vault",
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
                    "name": "spl_escrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool"
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
                                "path": "spinx_mint"
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
                    "name": "associated_token_program",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "set_number",
                    "type": "u64"
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
                    "name": "global_data",
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
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
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
            "name": "join_coinflip",
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
                    "name": "global_data",
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
                    "name": "joiner_ata",
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
                                "path": "spinx_mint"
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
                    "name": "spinx_mint"
                },
                {
                    "name": "coinflip_pool",
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
                                "path": "pool_id"
                            }
                        ]
                    }
                },
                {
                    "name": "sol_vault",
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
                    "name": "spl_escrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool"
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
                                "path": "spinx_mint"
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
                    "name": "associated_token_program",
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                },
                {
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                }
            ],
            "args": [
                {
                    "name": "pool_id",
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
                    "name": "set_number",
                    "type": "u64"
                },
                {
                    "name": "amount",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "result_coinflip",
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
                    "name": "coinflip_pool",
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
                                "path": "pool_id"
                            }
                        ]
                    }
                },
                {
                    "name": "spl_escrow",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool"
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
                                "path": "spinx_mint"
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
                    "name": "spinx_mint",
                    "writable": true
                },
                {
                    "name": "creator_ata",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.creator_player",
                                "account": "CoinflipPool"
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
                                "path": "spinx_mint"
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
                    "name": "joiner_ata",
                    "writable": true,
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account",
                                "path": "coinflip_pool.joiner_player",
                                "account": "CoinflipPool"
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
                                "path": "spinx_mint"
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
                    "name": "token_program",
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
                },
                {
                    "name": "system_program",
                    "address": "11111111111111111111111111111111"
                }
            ],
            "args": [
                {
                    "name": "pool_id",
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
            "name": "set_fee",
            "discriminator": [
                18,
                154,
                24,
                18,
                237,
                214,
                19,
                80
            ],
            "accounts": [
                {
                    "name": "admin",
                    "writable": true,
                    "signer": true
                },
                {
                    "name": "global_data",
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
                    "name": "coinflip_fee",
                    "type": "u64"
                },
                {
                    "name": "treasury_wallet",
                    "type": "pubkey"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "CoinflipPool",
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
            "name": "GlobalData",
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
            "name": "NetworkState",
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
            "name": "InvalidAdmin",
            "msg": "Invalid Admin Address"
        },
        {
            "code": 6001,
            "name": "AlreadyClaimed",
            "msg": "Already Claimed Game"
        },
        {
            "code": 6002,
            "name": "AlreadyDrawn",
            "msg": "Already Drawn Game"
        },
        {
            "code": 6003,
            "name": "NotWinner",
            "msg": "The Account is Not Winner"
        },
        {
            "code": 6004,
            "name": "NotReferrer",
            "msg": "The Account is Not Referrer"
        },
        {
            "code": 6005,
            "name": "TokenNotAllowed",
            "msg": "Token not allowed"
        },
        {
            "code": 6006,
            "name": "OwnerMismatch",
            "msg": "Owner mismatch"
        },
        {
            "code": 6007,
            "name": "InvalidAmount",
            "msg": "Invalid Bet Amount"
        },
        {
            "code": 6008,
            "name": "InvalidJoiner",
            "msg": "Invalid Joiner"
        },
        {
            "code": 6009,
            "name": "InvalidNumber",
            "msg": "Invalid Bet Number"
        },
        {
            "code": 6010,
            "name": "ChallengeTaken",
            "msg": "Challenge already taken"
        },
        {
            "code": 6011,
            "name": "ChallengeNotTaken",
            "msg": "Challenge not taken"
        },
        {
            "code": 6012,
            "name": "ChallengeCompleted",
            "msg": "Challenge already completed"
        },
        {
            "code": 6013,
            "name": "ChallengeCancelled",
            "msg": "Challenge already cancelled"
        },
        {
            "code": 6014,
            "name": "NotChallengeCreator",
            "msg": "Not the challenge creator"
        },
        {
            "code": 6015,
            "name": "NotTreasuryAuthority",
            "msg": "Not the treasury authority"
        },
        {
            "code": 6016,
            "name": "InvalidVRFResult",
            "msg": "Invalid VRF result"
        },
        {
            "code": 6017,
            "name": "InsufficientFunds",
            "msg": "Insufficient funds"
        },
        {
            "code": 6018,
            "name": "StillProcessing",
            "msg": "Randomness is still being fulfilled"
        }
    ],
    "types": [
        {
            "name": "CoinflipPool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "pool_id",
                        "type": "u64"
                    },
                    {
                        "name": "start_ts",
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
                        "name": "pool_amount",
                        "type": "u64"
                    },
                    {
                        "name": "creator_player",
                        "type": "pubkey"
                    },
                    {
                        "name": "creator_ata",
                        "type": "pubkey"
                    },
                    {
                        "name": "creator_amount",
                        "type": "u64"
                    },
                    {
                        "name": "creator_set_number",
                        "type": "u64"
                    },
                    {
                        "name": "joiner_player",
                        "type": "pubkey"
                    },
                    {
                        "name": "joiner_ata",
                        "type": "pubkey"
                    },
                    {
                        "name": "joiner_amount",
                        "type": "u64"
                    },
                    {
                        "name": "joiner_set_number",
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
                        "name": "status",
                        "type": {
                            "defined": {
                                "name": "PoolStatus"
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "GlobalData",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "super_admin",
                        "type": "pubkey"
                    },
                    {
                        "name": "treasury_wallet",
                        "type": "pubkey"
                    },
                    {
                        "name": "coinflip_fee",
                        "type": "u64"
                    },
                    {
                        "name": "spinx_token",
                        "type": "pubkey"
                    },
                    {
                        "name": "next_pool_id",
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "NetworkConfiguration",
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
                        "name": "request_fee",
                        "type": "u64"
                    },
                    {
                        "name": "fulfillment_authorities",
                        "type": {
                            "vec": "pubkey"
                        }
                    },
                    {
                        "name": "token_fee_config",
                        "type": {
                            "option": {
                                "defined": {
                                    "name": "OraoTokenFeeConfig"
                                }
                            }
                        }
                    }
                ]
            }
        },
        {
            "name": "NetworkState",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "config",
                        "type": {
                            "defined": {
                                "name": "NetworkConfiguration"
                            }
                        }
                    },
                    {
                        "name": "num_received",
                        "docs": [
                            "Total number of received requests."
                        ],
                        "type": "u64"
                    }
                ]
            }
        },
        {
            "name": "OraoTokenFeeConfig",
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
            "name": "PoolStatus",
            "type": {
                "kind": "enum",
                "variants": [
                    {
                        "name": "Waiting"
                    },
                    {
                        "name": "Processing"
                    },
                    {
                        "name": "Finished"
                    }
                ]
            }
        }
    ]
};
