(function() {
    if (!window.addEventListener)
        return;

    var options = INSTALL_OPTIONS;
    style = document.createElement('style');
    document.head.appendChild(style);
    style.innerHTML = (
        '#HW_badge_cont.HW_visible {' +
            'display: inline-block !important;' +
        '}'
    );
    var el;
    render = function() {
        el = Eager.createElement(options.location, el);
        el.className = 'eager-headway-app';

        if (options.translate) {
            window.HW_config = {
                account: options.id,
                selector: '.eager-headway-app',
                translations: {
                    title: options.title,
                    labels: {
                        "new": options.labelNew,
                        "improvements": options.labelImprovement,
                        "fix": options.labelFix
                    }
                }
            };
        } else {
            window.HW_config = {
                account: options.id,
                selector: '.eager-headway-app'
            };
        }
    };
    var async = function(u, c) {
        var d = document,
            t = 'script',
            o = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
        o.src = '//' + u;
        if (c) {
            o.addEventListener('load', function(e) {
                c(null, e);
            }, false);
        }
        s.parentNode.insertBefore(o, s);
    };
    var initApp = function() {
        render();
        if (!options.id) {
            return;
        }
        async('cdn.headwayapp.co/widget.js', function() {});
    };
    var setOptions = function(opts) {
        options = opts;
        initApp();
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
    INSTALL_SCOPE = {
        setOptions: setOptions
    };
})();
