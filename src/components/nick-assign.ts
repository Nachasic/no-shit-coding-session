import { LitElement, property, customElement, html } from 'lit-element';

@customElement('nick-assign')
export class NickAssign extends LitElement {
    @property() name: string;
    @property() nick?: string;

    changeNick (nick: string) {
        const event = new CustomEvent('renamed', {
            detail: { nick }
        });

        this.dispatchEvent(event)
    }

    render () {
        return html`
            <li>
                ${this.name} is gonna be called 
                    <input
                        type="text"
                        @change=${e => this.changeNick(e.target.value)}
                        value="${this.nick || ''}" />
            </li>
        `
    }
}