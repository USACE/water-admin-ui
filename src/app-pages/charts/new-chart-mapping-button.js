import { useConnect } from 'redux-bundler-hook';

import NewChartMappingModal from './new-chart-mapping-modal';

const NewChartVariableButton = ({ variables }) => {
  const { doModalOpen } = useConnect('doModalOpen');
  return (
    <a
      style={{
        marginLeft: 8,
        fontWeight: '800',
        fontSize: 18,
      }}
      className='primary'
      href='#newvariable'
      onClick={(e) => {
        e.preventDefault();
        // Limit chart variables that can be set here by passing list down as props
        // This allows the same NewChartMappingModal to be used for different kinds
        // of variables (e.g. "levels", "markers", "dots", etc.), but with different
        // options in the dropdown for selecting the type of mapping to be selected
        doModalOpen(NewChartMappingModal, {
          variables: variables,
        });
      }}
    >
      +add
    </a>
  );
};

export { NewChartVariableButton, NewChartVariableButton as default };
