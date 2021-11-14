/* eslint-disable consistent-return */
import {useEffect, useRef} from 'react';

/**
 * @remarks Does nothing on mount. Invokes callback after mount
 */
export const useEffectAfterMount = (
  cb: () => void | (() => void),
  deps: Array<any>,
) => {
  const componentJustMounted = useRef(true);
  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }
    componentJustMounted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
