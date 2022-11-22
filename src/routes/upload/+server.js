import { BlobServiceClient } from '@azure/storage-blob';
import { AZURE_STORAGE_SAS_URL } from '$env/static/private'
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  // Azure Setup

  const containerName = 'avatars';

  const blobService = new BlobServiceClient(AZURE_STORAGE_SAS_URL);
  const container = blobService.getContainerClient(containerName);
  /*await container.createIfNotExists({
    access: 'container',
  });*/

  // File Read 
  const data = await request.json();

  const file = data['image'];
  const timestamp = Date.now();
  const fileName = `avatar-${timestamp}.jpg`;
  // create blobClient for container
  const blobClient = container.getBlockBlobClient(fileName);

  // Decode File
  let imgBuffer = Buffer.from(file, 'base64')

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };

  // upload file
  await blobClient.uploadData(imgBuffer, options);

  console.log(`${fileName} uploaded!`)

  return json(fileName);
}
