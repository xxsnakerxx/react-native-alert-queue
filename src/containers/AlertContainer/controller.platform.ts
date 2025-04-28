import { useCallback } from 'react';

export const usePlatformController = () => {
  const onShow = useCallback(() => {}, []);

  const onBeforeUpdate = useCallback(() => {}, []);

  const onHide = useCallback(() => {}, []);

  return { bottomOffset: 0, onBeforeUpdate, onHide, onShow };
};
