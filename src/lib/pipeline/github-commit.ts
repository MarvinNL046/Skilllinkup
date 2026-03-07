const GITHUB_API_BASE = 'https://api.github.com';

async function githubApi(
  endpoint: string,
  method: string,
  body?: unknown
): Promise<unknown> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  const url = `${GITHUB_API_BASE}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `GitHub API error ${response.status} for ${method} ${endpoint}: ${errorText}`
    );
  }

  return response.json();
}

/**
 * Commits an image to `public/images/blog/{slug}.{ext}` in the GitHub repository
 * using the Trees API for an atomic commit.
 *
 * @param slug - The blog post slug (used as the filename)
 * @param imageBuffer - The image data as a Buffer
 * @param format - Image format: "webp" or "png" (default: "webp")
 * @returns The URL path `/images/blog/{slug}.{ext}`, or null on failure
 */
export async function commitImageToGitHub(
  slug: string,
  imageBuffer: Buffer,
  format: "webp" | "png" = "webp"
): Promise<string | null> {
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? 'main';

  if (!repo) {
    console.error('commitImageToGitHub: GITHUB_REPO environment variable is not set');
    return null;
  }

  const ext = format;
  const filePath = `public/images/blog/${slug}.${ext}`;
  const imagePath = `/images/blog/${slug}.${ext}`;

  try {
    // Step a: Get current HEAD ref to retrieve the latest commit SHA
    const refData = (await githubApi(
      `/repos/${repo}/git/ref/heads/${branch}`,
      'GET'
    )) as { object: { sha: string } };

    const commitSha = refData.object.sha;

    // Step b: Get the tree SHA from the current commit
    const commitData = (await githubApi(
      `/repos/${repo}/git/commits/${commitSha}`,
      'GET'
    )) as { tree: { sha: string } };

    const treeSha = commitData.tree.sha;

    // Step c: Create a blob from the base64-encoded image
    const blobData = (await githubApi(
      `/repos/${repo}/git/blobs`,
      'POST',
      {
        content: imageBuffer.toString('base64'),
        encoding: 'base64',
      }
    )) as { sha: string };

    const blobSha = blobData.sha;

    // Step d: Create a new tree that includes the new image file
    const newTreeData = (await githubApi(
      `/repos/${repo}/git/trees`,
      'POST',
      {
        base_tree: treeSha,
        tree: [
          {
            path: filePath,
            mode: '100644',
            type: 'blob',
            sha: blobSha,
          },
        ],
      }
    )) as { sha: string };

    const newTreeSha = newTreeData.sha;

    // Step e: Create the commit referencing the new tree
    const newCommitData = (await githubApi(
      `/repos/${repo}/git/commits`,
      'POST',
      {
        message: `blog: add featured image for ${slug}`,
        tree: newTreeSha,
        parents: [commitSha],
      }
    )) as { sha: string };

    const newCommitSha = newCommitData.sha;

    // Step f: Update the branch ref to point to the new commit
    await githubApi(
      `/repos/${repo}/git/refs/heads/${branch}`,
      'PATCH',
      { sha: newCommitSha }
    );

    return imagePath;
  } catch (error) {
    console.error(
      `commitImageToGitHub: Failed to commit image for slug "${slug}":`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}
