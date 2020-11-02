interface Button {
  render: () => void;
  onClick: () => void;
}

class WindowButton implements Button {
  render () {
    console.log('render window button')
  }

  onClick () {
    console.log('click window button')
  }
}

class HtmlButton implements Button {
  render () {
    console.log('render html button')
  }

  onClick () {
    console.log('click html button')
  }
}

abstract class Dialog {
  render() {
    const button: Button = this.createButton();
    button.render();
    button.onClick();
  }

  abstract createButton(): Button 
}

class WindowDialog extends Dialog {
  createButton() {
    return new WindowButton();
  }
}

class HtmlDialog extends Dialog {
  createButton() {
    return new HtmlButton();
  }
}

type Environment = "Desktop" | "Browser"

class Application {
  dialog: Dialog

  initialize() {
    // fake environment
    const env: Environment = Math.random() > 0.5 ? "Desktop" : "Browser";

    if (env === "Browser") this.dialog = new HtmlDialog()
    else if (env === "Desktop") this.dialog = new WindowDialog()
    else throw "Environment is not supported";

    this.dialog.render();
  }
}

const app = new Application();
app.initialize();
