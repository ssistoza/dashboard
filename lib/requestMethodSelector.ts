import HTTPMethod from 'http-method-enum';
import { NextApiRequest } from 'next';

interface IRequestMethodOptions {
  [HTTPMethod.CONNECT]?: () => any;
  [HTTPMethod.DELETE]?: () => any;
  [HTTPMethod.GET]?: () => any;
  [HTTPMethod.HEAD]?: () => any;
  [HTTPMethod.OPTIONS]?: () => any;
  [HTTPMethod.PATCH]?: () => any;
  [HTTPMethod.POST]?: () => any;
  [HTTPMethod.PUT]?: () => any;
  [HTTPMethod.TRACE]?: () => any;
}

export default function requestMethodSelector(
  req: NextApiRequest,
  options?: IRequestMethodOptions
) {
  switch (req.method) {
    case HTTPMethod.CONNECT:
      return options?.CONNECT();
    case HTTPMethod.DELETE:
      return options?.DELETE();
    case HTTPMethod.GET:
      return options?.GET();
    case HTTPMethod.HEAD:
      return options?.HEAD();
    case HTTPMethod.OPTIONS:
      return options?.OPTIONS();
    case HTTPMethod.PATCH:
      return options?.PATCH();
    case HTTPMethod.POST:
      return options?.POST();
    case HTTPMethod.PUT:
      return options?.PUT();
    case HTTPMethod.TRACE:
      return options?.TRACE();
  }
}
