describe('settings', () => {
  it('toggles mute', () => {
    // TODO - check the gain node  
    // (its value doesn't seem to change when exporting and importing it here)
    cy.visit('localhost:5173')
    const muteIcon = () => cy.get("[data-cy-icon=mute]");
    const volumeUpIcon = () => cy.get("[data-cy-icon=volumeup]");

    muteIcon().should("not.exist");
    volumeUpIcon().should("exist");

    volumeUpIcon().click()

    muteIcon().should("exist");
    volumeUpIcon().should("not.exist");

    muteIcon().click()

    muteIcon().should("not.exist");
    volumeUpIcon().should("exist");
  })
});

describe('Grid', () => {
  it('Toggles track', () => {
    cy.visit('localhost:5173')
    const btn = () => cy.get("[data-cy-button=track1toggle]");

    btn().should("have.attr",  "data-cy-isenabled", "true");
    btn().click();
    btn().should("have.attr",  "data-cy-isenabled", "false");
    btn().click();
    btn().should("have.attr",  "data-cy-isenabled", "true");
  });
  
  //TODO
  it.skip('can toggle many steps when mouse button is held down', () => {
   /* 
    Unable to currently test this as  
    realHover doesn't allow to customize mouse state. 
    (callback -> event.buttons should equal 1)  
    see: features/Step.tsx (handleMouseLeave)
    */
 
    cy.visit('localhost:5173')
    const step = (i: number) => cy.get(`[data-cy-trackstep=${i}]`);

    step(9).realMouseDown();

    step(10).realHover()
    step(11).realHover()
    
    step(10).should("have.attr", "data-cy-isenabled", "true")
    step(11).should("have.attr", "data-cy-isenabled", "true")
  })

  it('toggles track step when clicked', () => {
    cy.visit('localhost:5173')
    const step = () => cy.get("[data-cy-trackstep=14]");

    step().click()
    step().should("have.attr", "data-cy-isenabled", "true")
    step().click()
    step().should("have.attr", "data-cy-isenabled", "false")
  })

  it('clears all enabled steps',()=> {
    cy.visit('localhost:5173')
    const step = () => cy.get("[data-cy-trackstep=30]");
    const step1 = () => cy.get("[data-cy-trackstep=0]");
    const step2 = () => cy.get("[data-cy-trackstep=60]");
    const clearBtn = () => cy.get("[data-cy-button=clearTrackSteps]");

    step().click()
    step().should("have.attr", "data-cy-isenabled", "true")
    step1().click()
    step1().should("have.attr", "data-cy-isenabled", "true")
    step2().click()
    step2().should("have.attr", "data-cy-isenabled", "true")

    clearBtn().click()

    step().should("have.attr",  "data-cy-isenabled", "false")
    step1().should("have.attr", "data-cy-isenabled", "false")
    step2().should("have.attr", "data-cy-isenabled", "false")
  })
});

describe("Playback", () => {
  it("updates bpm", () =>{
    cy.visit("localhost:5173");
    const input  = () => cy.get("[data-cy-input=bpm]");
    const slider  = () => cy.get("[data-cy-slider=bpm]");
    input().click().type("160").invoke("val").should("equal", "160")
    slider().should("have.attr", "data-cy-value", `160`)
  });

  it("triggers play when user presses spacebar", () => {
    cy.visit("localhost:5173");
    const playIcon       = () => cy.get("[data-cy-icon=play]");
    const pauseIcon      = () => cy.get("[data-cy-icon=pause]");
    const playbackButton = () => cy.get("[data-cy-button=playback]");

    playbackButton().should("exist");
    playIcon().should("exist");
    pauseIcon().should("not.exist");

    // press down on spacebar
    cy.get('body').type(' ');

    // check if playback toggled
    playIcon().should("not.exist");
    pauseIcon().should("exist");

    // press down on spacebar
    cy.get('body').type(' ');

    // check if playback toggled
    playIcon().should("exist");
    pauseIcon().should("not.exist");
  })

  it("toggles play and pause modes", () => {
    cy.visit("localhost:5173");
    const playIcon  = () => cy.get("[data-cy-icon=play]");
    const pauseIcon = () => cy.get("[data-cy-icon=pause]");

    playIcon().should("exist");
    pauseIcon().should("not.exist");

    playIcon().click();

    playIcon().should("not.exist");
    pauseIcon().should("exist");

    pauseIcon().click();

    playIcon().should("exist");
    pauseIcon().should("not.exist");
  })
});

describe("Undo and redo", () => {
  it("is disabled before any actions are made", () => {
    cy.visit("localhost:5173");
    const undoButton = () => cy.get("[data-cy-button=undo]");
    const redoButton = () => cy.get("[data-cy-button=redo]");

    undoButton().should("be.disabled");
    redoButton().should("be.disabled");
  });

  it("is functioning properly when interacting with grid and pressing undo/redo buttons", () => {
    cy.visit("localhost:5173");

    const step =       () => cy.get("[data-cy-trackstep=10]");
    const undoButton = () => cy.get("[data-cy-button='undo']");
    const redoButton = () => cy.get("[data-cy-button='redo']");

    // click on step
    step().click();

    step().should("have.attr", "data-cy-isenabled", "true")
    undoButton().should("be.enabled");
    redoButton().should("be.disabled");

    // click undo
    undoButton().click();

    step().should("have.attr", "data-cy-isenabled", "false")
    undoButton().should("be.disabled");
    redoButton().should("be.enabled");

    // click redo
    redoButton().click();

    step().should("have.attr", "data-cy-isenabled", "true")
    undoButton().should("be.enabled");
    redoButton().should("be.disabled");
  });
});