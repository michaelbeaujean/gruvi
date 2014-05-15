describe("the gruvi app", function(){

  describe("playSimon", function(){
    playSimon();

    it("should increment the simonCounter by 1", function(){
      expect( simonCounter ).toEqual(1);
    });

    it("should push a note into the simonNotes array", function(){
      expect( simonNotes.length ).toEqual(1);
    });

    it("should set off the startTime", function(){
      expect( context.currentTime).not.toEqual(0);
    });
  });

  // describe("blink", function(){
  //   var firstDiv = $("#FFFF9C");
  //   blink(64849, "#FFFF9C");
  //   expect( firstDiv ).toHaveCss('background-color': '#FFFF9C');
  // });

});
