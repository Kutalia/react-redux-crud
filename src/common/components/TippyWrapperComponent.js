import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';

const TippyWrapper = ({ content, children }) => (
    <Tippy visible={!!content} delay={500} theme="translucent" content={content}>{children}</Tippy>
);

export default TippyWrapper;
