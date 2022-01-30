import type { NextApiRequest, NextApiResponse } from 'next'

import { fetchProofsByOwner, useReadOnlyVVallet } from 'lib/VVallet'
import { OwnerProof } from 'types/ownerProof'

const connection = useReadOnlyVVallet()

export default async function ownerProofsHandler(
  req: NextApiRequest,
  res: NextApiResponse<OwnerProof[]>,
) {
  const query = req.query['owner']
  const owner: string = query as string

  switch (req.method) {
    case 'GET':
      const resp: OwnerProof[] = await fetchProofsByOwner(connection, owner)
      // TODO: handle not found error here to return 404
      res.status(200).json(resp)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
