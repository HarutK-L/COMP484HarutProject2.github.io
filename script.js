$(function () {

  
  const petComments = {
    treat: "Is this organic?",
    play: "Your throwing kinda sucks ngl",
    exercise: "Hell yeah ima evolve soon",
    duplicate: "The more me's the better",
    change: "From one great form to another"
  };

  
  // These images cycle when the Change Pet button is clicked.
  const petImages = [
    "images/hound.jpg",
    "images/croc.jpeg",
    "images/bird.png",
    "images/turtle.jpeg"
  ];

  // =========================
  // CREATE FIRST PET
  // =========================
  initializePet($('.pet').first(), {
    name: "Leo",
    weight: 15,
    happiness: 20,
    imageIndex: 0
  }, petComments, petImages);

});



// This function gives each pet its own stats and button behavior.
function initializePet(petElement, stats, petComments, petImages) {
  petElement.data('pet_info', {...stats});

  updatePetDisplay(petElement, petImages);

  petElement.find('.treat-button').off('click').click(function () {
    let pet = petElement.data('pet_info');

    pet.happiness += 5;
    pet.weight += 1;

    showComment(petElement, petComments.treat);
    updatePetDisplay(petElement, petImages);
  });

  petElement.find('.play-button').off('click').click(function () {
    let pet = petElement.data('pet_info');

    pet.happiness += 3;
    pet.weight -= 1;

    showComment(petElement, petComments.play);
    updatePetDisplay(petElement, petImages);
  });

  petElement.find('.exercise-button').off('click').click(function () {
    let pet = petElement.data('pet_info');

    pet.happiness -= 2;
    pet.weight -= 2;

    showComment(petElement, petComments.exercise);
    updatePetDisplay(petElement, petImages);
  });


  // DUPLICATE BUTTON
  // Uses .clone() to copy the pet's HTML.
  // The clone gets its own separate stats and button clicks.
  petElement.find('.duplicate-button').off('click').click(function () {
    duplicatePet(petElement, petComments, petImages);
  });


  // Cycles through the pet images using the imageIndex value.
  // Uses .attr() to change the src of the image.
  // Uses fadeOut() and fadeIn() to animate the image change.
  petElement.find('.change-button').off('click').click(function () {
    let pet = petElement.data('pet_info');

    pet.imageIndex = (pet.imageIndex + 1) % petImages.length;

    petElement.find('.pet-image').fadeOut(200, function () {
      $(this).attr('src', petImages[pet.imageIndex]).fadeIn(200);
    });

    showComment(petElement, petComments.change);
  });
}



// This makes a new pet appear below the latest pet.
function duplicatePet(originalPet, petComments, petImages) {
  let newPet = originalPet.clone();

  let originalStats = originalPet.data('pet_info');

  let newStats = {
    name: originalStats.name + " Clone",
    weight: originalStats.weight,
    happiness: originalStats.happiness,
    imageIndex: originalStats.imageIndex
  };

  newPet.insertAfter($('.pet').last());

  initializePet(newPet, newStats, petComments, petImages);

  showComment(newPet, petComments.duplicate);
}



// Updates name, weight, happiness, and image.
// Also prevents weight and happiness from going below zero.
function updatePetDisplay(petElement, petImages) {
  let pet = petElement.data('pet_info');

  if (pet.weight < 0) {
    pet.weight = 0;
  }

  if (pet.happiness < 0) {
    pet.happiness = 0;
  }

  petElement.find('.name').text(pet.name);
  petElement.find('.weight').text(pet.weight);
  petElement.find('.happiness').text(pet.happiness);
  petElement.find('.pet-image').attr('src', petImages[pet.imageIndex]);
}



// Shows a comment above the pet image for a few seconds
function showComment(petElement, commentText) {
  let commentBox = petElement.find('.pet-comment');

  commentBox.text(commentText).fadeIn(200);

  setTimeout(function () {
    commentBox.fadeOut(500);
  }, 2000);
}