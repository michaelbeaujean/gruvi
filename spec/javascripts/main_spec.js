describe("the gruvi app", function(){

  describe("playSimon", function(){
    playSimon();

    it("should increment the simonCounter by 1", function(){
      expect( simonCounter ).toBeGreaterThan(0);
    });

    it("should push a note into the simonNotes array", function(){
      expect( simonNotes.length ).toBeGreaterThan(0);
    });

    it("should set off the startTime", function(){
      expect( context.currentTime ).toEqual(0);
    });
  });

  // jasmine-jQuery test that has yet to work

  // describe("blink", function(){
  //   var firstDiv = $("#FFFF9C");
  //   blink(64849, "#FFFF9C");
  //   expect( firstDiv ).toHaveCss('background-color': '#FFFF9C');
  // });

});
