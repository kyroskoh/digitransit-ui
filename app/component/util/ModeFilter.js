import React from 'react';
import ToggleButton from './ToggleButton';
import config from '../../config';

class ModeFilter extends React.Component {
  static propTypes = {
    modes: React.PropTypes.array.isRequired,
    action: React.PropTypes.object.isRequired,
    buttonClass: React.PropTypes.string,
  };

  static contextTypes = {
    executeAction: React.PropTypes.func.isRequired,
  };

  availableModes = () => Object.keys(config.transportModes).filter(
    (mode) => (config.transportModes[mode].availableForSelection))

  calcWidth = () => {
    const numberOfModes = this.availableModes().length;
    return 100 / numberOfModes;
  }

  render = () => {
    const ModeToggleButton = ({ type, style }) => {
      if (config.transportModes[type].availableForSelection) {
        const icon = `${type}-withoutBox`;
        const camelCaseType = type.charAt(0).toUpperCase() + type.slice(1);
        const upperCaseType = type.toUpperCase();
        const actionName = `toggle${camelCaseType}State`;
        return (<ToggleButton
          icon={icon}
          onBtnClick={() => {
            this.context.executeAction(this.props.action[actionName]);
          }}
          state={this.props.modes.indexOf(upperCaseType) !== -1}
          checkedClass={type}
          style={style}
          className={this.props.buttonClass}
        />);
      }
      return null;
    };
    const widthPercentage = this.calcWidth();

    const style = {
      width: `${widthPercentage}%`,
    };

    // TODO we could build the filter strictly based on config
    return (<div className="btn-bar mode-filter no-select">
      <ModeToggleButton type="bus" style={style} />
      <ModeToggleButton type="tram" style={style} />
      <ModeToggleButton type="rail" style={style} />
      <ModeToggleButton type="subway" style={style} />
      <ModeToggleButton type="ferry" style={style} />
      <ModeToggleButton type="citybike" style={style} />
    </div>);
  }
}

export default ModeFilter;
