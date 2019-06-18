class Multinav {
    constructor(id) {
        this.id = id;
        this.el = document.getElementById(this.id);
        this.links = this.el.querySelectorAll('.' + this.id + '__link');
        this.backs = this.el.querySelectorAll('.' + this.id + '__back');
        this.reset = this.el.querySelector('#' + this.id + '__reset');
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.links.forEach(item => {
            item.addEventListener('click', this.handleItemClick)
        });

        this.backs.forEach(back => {
            back.addEventListener('click', this.handleBackClick);
        });

        this.reset.addEventListener('click', this.handleReset);
        this.handleReset();
    }

    handleItemClick(e) {
        e.preventDefault();
        const list = e.target.nextElementSibling;

        if (list) {
            const parent = this.el.querySelector('.parent');

            // remove other active
            this.el.querySelector('.' + this.id + '__list.active').classList.remove('active');

            // change parent to become root
            parent.classList.remove('parent');
            parent.classList.add('root');

            // add 'parent' to parent ul
            list.parentElement.parentElement.classList.add('parent');

            // activate list contained
            list.classList.add('active');
        }
    }

    handleBackClick(e) {
        e.preventDefault();
        const active = e.target.parentElement.parentElement;
        const parent = active.parentElement.parentElement;
        const root = parent.parentElement.parentElement;

        // change 1st root to parent
        root.classList.remove('root');
        root.classList.add('parent');

        // remove root and add parent class
        parent.classList.remove('parent');
        parent.classList.add('active');

        // remove active class
        active.classList.remove('active');
    }

    handleReset() {
        console.log('multinav reset');

        // remove any active class - should be just one
        this.el.querySelectorAll('.active').forEach(node => {
            node.classList.remove('active');
        });
        this.el.querySelectorAll('.parent').forEach(node => {
            node.classList.remove('parent');
        });
        this.el.querySelectorAll('.root').forEach(node => {
            node.classList.remove('root');
        });

        // add to first  multinav__list 'active' class
        this.el.classList.add('parent');
        this.el.querySelector('.' + this.id + '__container').classList.add('parent');
        this.el.querySelector('.' + this.id + '__list').classList.add('active');
    }
}

window.multinav = new Multinav('multinav');
