/* --- Path generator --- */
const path = require("path");
const fs = require("fs");

/* --- Solidity compiler --- */
const solc = require("solc");

/* --- Reading Solidity sourcecode --- */
const contractPath = path.resolve(__dirname, "contracts", "lottery.sol");
const solSource = fs.readFileSync(contractPath, "utf8");

const sol_json_input = {
    language: "Solidity",
    sources: {
        "lottery.sol" : {
            content: solSource
        }
    },
    settings: {
        outputSelection: {
            "lottery.sol" : {
                "Lottery" : [ "abi", "evm.bytecode" ]
            }
        }
    }
}

/* --- Compiling contract and extracting abi and bytecode --- */
const contract = JSON.parse(solc.compile(JSON.stringify(sol_json_input)));
const abi = contract.contracts["lottery.sol"].Lottery.abi;
const bytecode = contract.contracts["lottery.sol"].Lottery.evm.bytecode.object;

/* --- Exporting JSON Object --- */
module.exports = { abi, bytecode };