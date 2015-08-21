import React, {Component} from 'react';
import {Button, FormField, FormInput, FormRow, Modal, ModalHeader, ModalBody, ModalFooter} from 'elemental';

export default class Settings extends Component {
  static defaultProps = {
    isOpen: true,
    onCancel: () => {},
    onSave: () => {},
  }

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleChaosChange = this.handleChaosChange.bind(this);
    this.state = {min: 0, chaos: 0.5};
  }

  handleSave(e) {
    const {min, chaos} = this.state;
    this.props.onSave(chaos, min);
  }

  handleMinChange(e) {
    this.setState({min: e.target.value});
  }

  handleChaosChange(e) {
    this.setState({chaos: e.target.value});
  }

  render() {
    const {isOpen, onCancel, onSave, minTransactions, chaosFactor} = this.props;
    return (
      <Modal isOpen={isOpen} onCancel={onCancel} backdropClosesModal>
        <ModalHeader text="Settings" onClose={onCancel} showCloseButton />
        <ModalBody>
          <FormRow>
            <FormField width="one-half" label="Min. Transactions for RSI" className="form-field">
              <FormInput ref="min" defaultValue={minTransactions} placeholder="Minimum Transactions Needed for RSI" onChange={this.handleMinChange} />
            </FormField>
            <FormField width="one-half" label="Chaos Factor" className="form-field">
              <FormInput ref="chaos" defaultValue={chaosFactor} onChange={this.handleChaosChange} />
            </FormField>
          </FormRow>
        </ModalBody>
        <ModalFooter>
          <Button type="primary" onClick={this.handleSave}>Save</Button>
          <Button type="link-cancel" onClick={onCancel}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
