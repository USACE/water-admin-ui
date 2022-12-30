// todo; this should be better represented in API so it doesn't need to be
// enumerated here. The shape here generally represents
// { <chart-type>: {
//       <group>: {
//           ...variable...
//       }
// }
// group is a generic grouping, used to categorize variables into section or common functionality
// within a visualization
const CHART_MAPPING_OPTIONS = {
  'dam-profile-chart': {
    required: {
      pool: {
        group: 'required',
        variable: 'pool',
        name: 'Pool Water Level',
      },
      tail: {
        group: 'required',
        variable: 'tail',
        name: 'Tailwater Level',
      },
      inflow: {
        group: 'required',
        variable: 'inflow',
        name: 'Inflow',
      },
      outflow: {
        group: 'required',
        variable: 'outflow',
        name: 'Outflow',
      },
      damtop: {
        group: 'required',
        variable: 'damtop',
        name: 'Top of Dam',
      },
      dambottom: {
        group: 'required',
        variable: 'dambottom',
        name: 'Bottom of Dam',
      },
    },
    levels: {
      'level-top-of-flood': {
        group: 'level',
        variable: 'level-top-of-flood',
        name: 'Top of Flood Control',
      },
      'level-top-of-normal': {
        group: 'level',
        variable: 'level-top-of-normal',
        name: 'Top of Normal',
      },
      'level-bottom-of-normal': {
        group: 'level',
        variable: 'level-bottom-of-normal',
        name: 'Bottom of Normal',
      },
    },
  },
};

export { CHART_MAPPING_OPTIONS };
