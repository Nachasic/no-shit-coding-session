import { html, LitElement, customElement, property, TemplateResult } from 'lit-element';
import { NickNameMap, Connect } from '../store';

import '../components/nick-assign';

@customElement('app-view')
@Connect
export class AppView extends LitElement {
    @property({ attribute: false }) map: NickNameMap = new Map();

    submitName () {
        const inputRef: HTMLInputElement = this.shadowRoot.querySelector('input#nameInput');
        const newName = inputRef.value;

        for (const name of this.map.keys()) {
            if (name === newName) {
                return alert('Please, enter a unique name!');
            }
        }

        // Add new name to the store  
    }

    submitNick (name: string, nick: string) {
        // Submit changes to the store
    }

    onStateUpdate (newState: NickNameMap) {
        this.map = newState;
    }

    render () {
        const nicknameTemplates: TemplateResult[] = [];

        for (const [name, nick] of this.map.entries()) {
            nicknameTemplates.push(
                html`<nick-assign 
                    name=${name}
                    nick=${nick}
                    @renamed=${ ({ detail: { nick } }) => this.submitNick(name, nick) }
                />`
            )
        }

        return html`
            <h1>Let's assign some nicknames!</h1>
            <ul>
                ${nicknameTemplates}
                <li>
                    <input type="text" id="nameInput"/>
                    <button @click=${ e => this.submitName() }>Submit</button>
                </li>
            </ul>
        `
    }
}