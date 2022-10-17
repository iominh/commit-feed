export interface CommitsType {
  sha: string;
  node_id: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
    commiter: {
      name: string;
      email: number;
      date: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
    }
  };
}
