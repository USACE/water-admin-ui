import { useConnect } from 'redux-bundler-hook';
import { MdContentCopy } from 'react-icons/md';

export default function ChartApiLink() {
  const { chartDetailApiLink: apiLink } = useConnect(
    'selectChartDetailApiLink'
  );

  return !apiLink ? null : (
    <span
      style={{ cursor: 'copy' }}
      onClick={() => {
        navigator.clipboard.writeText(apiLink).then(
          () => {
            console.log(`Copied link to clipboard: ${apiLink}`);
          },
          () => {
            console.error(`Failed to write link to clipboard: ${apiLink}`);
          }
        );
      }}
    >
      <small>
        <MdContentCopy /> <strong>Image:</strong> {apiLink}
      </small>
    </span>
  );
}
