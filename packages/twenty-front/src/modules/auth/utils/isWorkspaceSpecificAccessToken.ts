export const isWorkspaceSpecificAccessToken = (
  tokenString: string,
): boolean => {
  try {
    const base64Url = tokenString.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));

    return payload.type === 'ACCESS';
  } catch {
    return false;
  }
};
