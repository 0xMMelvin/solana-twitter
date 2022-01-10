import { inject, provide, computed } from 'vue'
import { useAnchorWallet } from '@solana/wallet-adapter-vue'
import { Program, Provider } from '@project-serum/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import idl from '../../../target/idl/solana_twitter.json'

const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)
const workspaceSymbol = Symbol()

export const useWorkspace = () => inject(workspaceSymbol)

export const initWorkspace = () => {
  const wallet = useAnchorWallet()
  const connection = new Connection('http://127.0.0.1:8899', commitment)
  const provider = computed(
    () =>
      new Provider(connection, wallet.value, {
        preflightCommitment,
        commitment
      })
  )
  const program = computed(() => new Program(idl, programID, provider.value))

  provide(workspaceSymbol, {
    wallet,
    connection,
    provider,
    program
  })
}
