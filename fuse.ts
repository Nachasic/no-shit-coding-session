import { FuseBox, WebIndexPlugin, QuantumPlugin, CSSModules, CSSPlugin, SassPlugin, EnvPlugin } from 'fuse-box';
import { context, task, src } from 'fuse-box/sparky';
import { join } from 'path';

const PATH_HOME = join(__dirname, 'src');
const PATH_DIST = join(__dirname, 'dist');
const PATH_CACHE = join(__dirname, '.fusebox');
const OUTPUT_PATTERN = join(PATH_DIST, '$name.js');

class BuildCtx {
    public __PROD__: boolean = false;

    getConfig() {
        return FuseBox.init({
            homeDir: PATH_HOME,
            target: 'borwser@es6',
            output: OUTPUT_PATTERN,
            hash: this.__PROD__,
                sourceMaps: {
                    project: !this.__PROD__,
                    vendor: false,
                },
                plugins: [
                    WebIndexPlugin({
                        title: 'No-Shit',
                    }),
                    CSSPlugin(),
                    this.__PROD__ && QuantumPlugin({
                        uglify: true,
                        css : true,
                    }),
                ],
        });
    }

    produceBundle(fuse: FuseBox) {
        const app = fuse.bundle('app');

        if (!this.__PROD__) {
            app.hmr({ reload: true });
            app.watch();
        }
        app.target('browser');
        app.instructions('> index.ts');

        return app;
    }
}

context(() => new BuildCtx());

const tasks = {
    'clean:dist': () => src(PATH_DIST)
        .clean(PATH_DIST)
        .exec(),
    'clean:cache': () => src(PATH_CACHE)
        .clean(PATH_CACHE)
        .exec(),
    'build:dev': async (ctx: BuildCtx) => {
        ctx.__PROD__ = false;
        const fuse = ctx.getConfig();

        ctx.produceBundle(fuse);

        fuse.dev();

        await fuse.run();
    },
    'build:prod': async (ctx: BuildCtx) => {
        ctx.__PROD__ = true;
        const fuse = ctx.getConfig();

        ctx.produceBundle(fuse);

        await fuse.run();
    },
};

// Type and helper function to enforce type-safety for task-runner
type TaskName = keyof typeof tasks | 'default' | 'dist';
const tsk = (
    taskName: TaskName,
    deps?: TaskName[],
    taskFunc?: (ctx?: BuildCtx) => any | void,
) => task(taskName, deps, taskFunc);

tsk('clean:cache', [], tasks['clean:cache']);
tsk('clean:dist', [], tasks['clean:dist']);
tsk('default', ['clean:cache', 'clean:dist'], tasks['build:dev']);
tsk('dist', ['clean:cache', 'clean:dist'], tasks['build:prod']);
