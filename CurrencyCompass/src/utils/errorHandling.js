export const handleApiError = (error, t) => {
    if (error.response) {
      // サーバーからのレスポンスがある場合
      switch (error.response.status) {
        case 400:
          return t('badRequestError');
        case 401:
          return t('unauthorizedError');
        case 403:
          return t('forbiddenError');
        case 404:
          return t('notFoundError');
        case 500:
          return t('serverError');
        default:
          return t('unknownError');
      }
    } else if (error.request) {
      // リクエストは送信されたがレスポンスがない場合
      return t('networkError');
    } else {
      // リクエストの設定中にエラーが発生した場合
      return t('configurationError');
    }
  };