import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('simple-mini-card-element')
export class SimpleMiniCardElement extends LitElement {
  @property({type: String})
  theme: string = '';

  @property({type: String})
  ignoreTagText: string = '';

  @property({type: Boolean, reflect: true})
  hideTags: boolean = false;

  @property({type: Boolean, reflect: true})
  hideDate: boolean = false;

  @property({type: Object, reflect: false})
  item: object;

  @property({type: Number})
  tagDisplayCount: number = 3;

  static override styles = css`
    a {
      text-decoration: none;
    }

    .card-wrapper {
      max-width: 100%;
      flex-basis: 100%;
      flex-grow: 0;
      display: block;
      box-sizing: inherit;
    }

    .card {
      display: flex;
    }

    :host([theme='large']) .card {
      flex-direction: column;
    }

    .card-text,
    .card-image {
      padding: 0.4rem;
    }

    .card-meta-wrapper {
      padding-top: 0px;
      align-items: baseline;
      justify-content: space-between;
      display: flex;
    }

    .card-meta {
      align-items: center;
      display: flex;
      min-width: 0;
    }

    .card-meta-date {
      font-size: 13px;
      color: rgba(117, 117, 117, 1);
      font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      line-height: 20px;
    }

    .card-meta-dot {
      padding-left: 6px;
      padding-right: 6px;
      display: block;
      color: rgba(117, 117, 117, 1);
      line-height: 20px;
      font-size: 14px;
    }

    .card-meta-tags {
      list-style-type: none;
      padding-left: 6px;
      padding-right: 6px;
      display: block;
      color: rgba(117, 117, 117, 1);
      line-height: 20px;
      font-size: 14px;
    }

    .card-meta-tags li {
      padding-right: 0.1rem;
      display: inline;
    }

    .card-meta-tag {
      background-color: #e3e7af;
      color: rgba(117, 117, 117, 1);
      position: relative;
      line-height: 20px;
      padding: 4px 8px;
      border-radius: 100px;
      transition: background 300ms ease 0s;
      white-space: nowrap;
      font-size: 12px;
      text-decoration: none;
    }

    :host([theme='minimal-small']) .card-meta-tag {
      background-color: var(--grey-2);
      line-height: 12px;
      padding: 2px 8px;
      font-size: 10px;
      text-decoration: none;
    }

    .title {
      -webkit-line-clamp: 2;
      max-height: 40px;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      text-overflow: ellipsis;
      font-weight: 700;
      letter-spacing: 0;
      font-size: 16px;
      overflow: hidden;
      color: rgba(41, 41, 41, 1);
      line-height: 20px;
      font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      padding-bottom: 0px;
    }

    :host([theme='minimal-small']) .title {
      font-size: 14px;
      line-height: 14px;
    }

    h2 {
      padding-bottom: 0px;
      margin-bottom: 0px;
    }

    .tag {
      border-radius: 3px;
      padding: 6px 16px;
      margin-bottom: 8px;
      margin-right: 8px;
      border: 1px solid rgba(230, 230, 230, 1);
      display: inline-block;
    }

    .text {
      font-size: 13px;
      color: rgba(117, 117, 117, 1);
      line-height: 20px;
      font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 400;
      margin: 0;
    }

    .tag:hover {
      border: 1px solid red;
    }

    .tag:hover p.text {
      color: red;
    }

    .image {
      object-fit: cover;
    }
  `;

  override render() {
    var width = '100';
    var height = '100';
    if (this.theme == 'minimal-small') {
      width = '75px';
      height = '75px';
    } else if (this.theme == 'large') {
      width = '100%';
      height = '300';
    }

    return html`
      <div class="card-wrapper">
        <a class="card" href="${this.item.href}">
          <div class="card-image">
            <img
              class="image"
              src="${this.item.image
                ? this.item.image
                : 'img/hyrox-photo-banner.jpg'}"
              alt="Girl in a jacket"
              width="${width}"
              height="${height}"
            />
          </div>
          <div class="card-text">
            <h2 class="title">${this.item.name}</h2>
            <div class="card-meta-wrapper">
              <div class="card-meta">
                ${this.item.date && !this.hideDate
                  ? html`
                      <span class="card-meta-date">
                        <span>${this.item.date}</span>
                      </span>
                      <div class="card-meta-dot" aria-hidden="true">
                        <span>·</span>
                      </div>
                    `
                  : ''}
                ${this.item.tags && !this.hideTags
                  ? html`
                      <ul class="card-meta-tags">
                        ${this.item.tags.map((tag, index) => {
                          if (tag === this.ignoreTagText) {
                            return '';
                          }

                          if (index < this.tagDisplayCount) {
                            return html`<li>
                              <a
                                class="card-meta-tag"
                                aria-hidden="true"
                                href="discover/${tag}"
                                >${tag}</a
                              >
                            </li>`;
                          } else {
                            return '';
                          }
                        })}
                      </ul>
                    `
                  : ''}
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
  }
}
