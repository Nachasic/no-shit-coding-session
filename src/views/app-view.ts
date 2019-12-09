import { html, LitElement, customElement, property, TemplateResult } from 'lit-element';
import { NickNameMap } from '../store';

import '../components/nick-assign';

@customElement('app-view')
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

    render () {
        const nicknameTemplates: TemplateResult[] = [];

        for (const [name, nick] of this.map.entries()) {
            nicknameTemplates.push(
                html`<nick-assign 
                    name=${name},
                    nick=${nick},
                    @renamed=${ e => console.log(e) }
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