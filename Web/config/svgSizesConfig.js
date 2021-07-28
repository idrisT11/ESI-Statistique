
let POS_ZERO_GRAPH,
    POS_OX_GRAPH,
    POS_OY_GRAPH,
    label_axe_X_posY,
    label_axe_X_posX,
    axeY_label_fontsize,
    axeX_label_fontsize;

let isMobile = (screen.width < 900);

if(isMobile)
{
    POS_ZERO_GRAPH = {
        x: 8,
        y: 89
    },
    POS_OX_GRAPH = {
        x: 89,
        y: POS_ZERO_GRAPH.y
    },
    POS_OY_GRAPH = {
        x: POS_ZERO_GRAPH.x,
        y: 8,
    };

    label_axe_X_posY = 94;
    label_axe_Y_posX = 6;
    axeY_label_fontsize = '0.8em';
    axeX_label_fontsize = '0.8em';
}

else{
    POS_ZERO_GRAPH = {
        x: 5,
        y: 92
    };
    POS_OX_GRAPH = {
        x: 92,
        y: POS_ZERO_GRAPH.y
    };
    POS_OY_GRAPH = {
        x: POS_ZERO_GRAPH.x,
        y: 5,
    };
    label_axe_X_posY = 95;
    label_axe_Y_posX = 3.5;
    axeY_label_fontsize = '1em';
    axeX_label_fontsize = '1em';
}