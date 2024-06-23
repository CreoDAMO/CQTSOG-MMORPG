import contractFiles from '../smartcontracts/artifacts/*/*.json'

const contracts = {}

contractFiles.keys().forEach(file => {
  const contract = file.replace(/^.*[\\\/]/, '').replace('.json', '')
  contracts[contract] = contractFiles(file).abi
})

export default contracts
