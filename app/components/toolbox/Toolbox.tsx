import * as React from 'react';
import styled from 'styled-components';
import { Tool, ToolType } from './Tool';
import { ToolboxIcon } from './ToolboxIcon';
import { Color } from '../../utils/Color';

const Wrapper = styled.ul.attrs<{
  x: number;
  y: number;
}>({
  x: (props) => props.x,
  y: (props) => props.y
})`
  position: fixed;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
`;

const ToolSpace = styled.li`
  background-color: transparent;
  display: flex;
  width: 5px;
  margin: 0 1px;
`;

const ToolItem = styled.li`
  background-color: ${Color.GRAY};
  display: flex;
  flex: 1 1 auto;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  padding: 6px 8px;
  margin: 0 1px;

  &:hover {
    cursor: pointer;
    background-color: ${Color.ORANGE};
  }
`;

const MenuWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
`;

interface Props {
  x: number;
  y: number;
  isStuffVisible: boolean;
  setVisibility: (visible: boolean) => void;
  create: (tool: ToolType) => void;
  toggle: (tool: ToolType) => void;
  toggleHelp: () => void;
}

interface State {
  visible: boolean;
  onTop: boolean;
  isMenuOpen: boolean;
}

export class Toolbox extends React.Component<Props, State> {
  state = {
    visible: true,
    onTop: true,
    isMenuOpen: false
  };

  setOnTop = (value: boolean) => {
    this.setState({
      onTop: value
    });
  };

  setMenuOpen = (value: boolean) => {
    this.setState({
      isMenuOpen: value
    });
  };

  render() {
    const {
      isStuffVisible,
      x,
      y,
      create,
      toggle,
      setVisibility,
      toggleHelp
    } = this.props;
    const { onTop, isMenuOpen } = this.state;
    return (
      <Wrapper x={x} y={y}>
        <ToolItem onClick={() => this.setMenuOpen(!isMenuOpen)}>
          <ToolboxIcon icon={isMenuOpen ? 'x' : 'more-vertical'} />
        </ToolItem>
        {isMenuOpen && (
          <MenuWrapper>
            <ToolSpace />
            <ToolItem onClick={() => this.setOnTop(!onTop)}>
              <ToolboxIcon icon={onTop ? 'zap' : 'zap-off'} />
            </ToolItem>
            <ToolItem onClick={() => setVisibility(!isStuffVisible)}>
              <ToolboxIcon icon={isStuffVisible ? 'eye' : 'eye-off'} />
            </ToolItem>
            <ToolSpace />
            <ToolItem onClick={() => create(Tool.GUIDE)}>
              <ToolboxIcon icon="layout" />
            </ToolItem>
            <ToolItem onClick={() => create(Tool.RULER)}>
              <ToolboxIcon icon="square" />
            </ToolItem>
            <ToolItem onClick={() => create(Tool.ONION)}>
              <ToolboxIcon icon="image" />
            </ToolItem>
            <ToolItem onClick={() => toggle(Tool.GRID)}>
              <ToolboxIcon icon="grid" />
            </ToolItem>
            <ToolSpace />
            <ToolItem onClick={() => toggleHelp()}>
              <ToolboxIcon icon="help-circle" />
            </ToolItem>
          </MenuWrapper>
        )}
      </Wrapper>
    );
  }
}
